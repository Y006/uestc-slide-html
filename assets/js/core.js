/* =========================================
   My-HTML-PPT-Template - 核心逻辑
   版本: 1.0.0
   说明: PPT 核心功能实现
   ========================================= */

class PPTEngine {
    constructor(config) {
        this.config = config;
        this.stage = document.getElementById('stage');
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.currentIndex = 0;
        this.autoPlayTimer = null;
        
        this.init();
    }
    
    // ==========================================
    // 初始化
    // ==========================================
    init() {
        if (this.config.navigation.enabled) {
            this.initNavigation();
        }
        
        this.resizeLayout();
        this.bindEvents();

        const storageKey = 'ppt_last_index_' + window.location.pathname;
        const savedIndex = localStorage.getItem(storageKey);
        const startIndex = savedIndex !== null ? parseInt(savedIndex, 10) : 0;
        
        // 显示第一页
        if (this.slides.length > 0) {
            const safeIndex = (startIndex >= 0 && startIndex < this.slides.length) ? startIndex : 0;
            this.goToSlide(safeIndex);
        }
        
        // 自动播放
        if (this.config.autoPlay) {
            this.startAutoPlay();
        }
    }
    
    // ==========================================
    // 动态生成导航栏与页脚
    // ==========================================
    initNavigation() {
        let chapters = [];
        let chapterMap = {};
        
        // 构建章节结构
        this.slides.forEach((slide, index) => {
            const cId = slide.dataset.chapterId;
            const cTitle = slide.dataset.chapterTitle;
            
            if (!chapterMap[cId]) {
                let newChapter = { id: cId, title: cTitle, pages: [] };
                chapters.push(newChapter);
                chapterMap[cId] = newChapter;
            }
            chapterMap[cId].pages.push(index);
        });
        
        // 为每页生成导航栏和页脚
        this.slides.forEach((slide, slideIndex) => {
            // 生成导航栏
            const header = this.createHeader(slide, chapters, slideIndex);
            slide.insertBefore(header, slide.firstChild);
            
            // 生成页脚
            const footer = this.createFooter(slideIndex);
            slide.appendChild(footer);
        });
    }
    
    // 创建导航栏
    createHeader(slide, chapters, slideIndex) {
        const header = document.createElement('div');
        header.className = 'ppt-header';
        
        chapters.forEach(chap => {
            const section = document.createElement('div');
            section.className = 'header-section';
            
            if (chap.id === slide.dataset.chapterId) {
                section.classList.add('active-chapter');
            }
            
            // 章节标题
            if (this.config.navigation.showChapterTitle) {
                const titleDiv = document.createElement('div');
                titleDiv.className = 'header-title';
                titleDiv.innerText = chap.title;
                titleDiv.onclick = () => this.goToSlide(chap.pages[0]);
                section.appendChild(titleDiv);
            }
            
            // 进度点
            if (this.config.navigation.showDots) {
                const dotsDiv = document.createElement('div');
                dotsDiv.className = 'header-dots';
                
                chap.pages.forEach(pageIndex => {
                    const dot = document.createElement('span');
                    dot.className = 'dot';
                    
                    if (pageIndex === slideIndex) {
                        dot.classList.add('active-page');
                    }
                    
                    dot.onclick = (e) => {
                        e.stopPropagation();
                        this.goToSlide(pageIndex);
                    };
                    
                    dotsDiv.appendChild(dot);
                });
                
                section.appendChild(dotsDiv);
            }
            
            header.appendChild(section);
        });
        
        return header;
    }
    
    // 创建页脚
    createFooter(slideIndex) {
        const footer = document.createElement('div');
        footer.className = 'ppt-footer';
        
        const footerConfig = this.config.footer;
        
        footer.innerHTML = `
            <div class="footer-upper">
                <span>${footerConfig.author}</span>
                <span>${footerConfig.title}</span>
            </div>
            <div class="footer-lower">
                <span>${footerConfig.paper_name}</span>
                <span>${slideIndex + 1} / ${this.slides.length}</span>
            </div>
        `;
        
        return footer;
    }
    
    // ==========================================
    // 缩放逻辑
    // ==========================================
    resizeLayout() {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const scale = Math.min(
            winW / this.config.width,
            winH / this.config.height
        );
        this.stage.style.transform = `translate(-50%, -50%) scale(${Math.max(scale, 0.1)})`;
    }
    
    // ==========================================
    // 切换幻灯片
    // ==========================================
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        this.slides[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add('active');
        
        // 保存当前页码进度
        const storageKey = 'ppt_last_index_' + window.location.pathname;
        localStorage.setItem(storageKey, index);
        
        // 触发渲染
        this.renderSlide();
        
        // 重置自动播放
        if (this.config.autoPlay) {
            this.resetAutoPlay();
        }
    }
    
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    firstSlide() {
        this.goToSlide(0);
    }
    
    lastSlide() {
        this.goToSlide(this.slides.length - 1);
    }
    
    // ==========================================
    // 渲染当前页
    // ==========================================
    renderSlide() {
        // 代码高亮
        if (this.config.libraries.prism.enabled && window.Prism) {
            window.Prism.highlightAll();
        }
        
        // 数学公式
        if (this.config.libraries.mathjax.enabled && window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }
    
    // ==========================================
    // 自动播放
    // ==========================================
    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            if (this.currentIndex < this.slides.length - 1) {
                this.nextSlide();
            } else {
                this.stopAutoPlay();
            }
        }, this.config.autoPlayInterval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    // ==========================================
    // 全屏控制
    // ==========================================
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    // ==========================================
    // 事件绑定
    // ==========================================
    bindEvents() {
        // 窗口缩放
        window.addEventListener('resize', () => this.resizeLayout());
        
        // 加载完成
        window.addEventListener('load', () => {
            this.resizeLayout();
            this.renderSlide();
        });
        
        // 键盘事件
        if (this.config.keyboard.enabled) {
            document.addEventListener('keydown', (e) => {
                const shortcuts = this.config.keyboard.shortcuts;
                
                if (shortcuts.next.includes(e.key)) {
                    e.preventDefault();
                    this.nextSlide();
                } else if (shortcuts.prev.includes(e.key)) {
                    e.preventDefault();
                    this.prevSlide();
                } else if (shortcuts.first.includes(e.key)) {
                    e.preventDefault();
                    this.firstSlide();
                } else if (shortcuts.last.includes(e.key)) {
                    e.preventDefault();
                    this.lastSlide();
                } else if (shortcuts.toggleFullscreen.includes(e.key)) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
            });
        }
        
        // 触摸滑动 (移动端支持)
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.nextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                this.prevSlide();
            }
        };
    }
}

// ==========================================
// 初始化 PPT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 确保配置已加载
    if (typeof PPT_CONFIG !== 'undefined') {
        window.pptEngine = new PPTEngine(PPT_CONFIG);
    } else {
        console.error('PPT_CONFIG 未定义，请确保 config.js 已正确加载');
    }
});
/* =========================================
   My-HTML-PPT-Template - 配置文件
   版本: 1.0.0
   说明: 全局配置项，可根据需要修改
   ========================================= */

const PPT_CONFIG = {
    // 设计尺寸 (16:9)
    width: 1920,
    height: 1080,
    
    // 舞台边距
    margin: 0,
    
    // 翻页动画 (预留)
    transition: 'fade', // 可选: 'fade', 'slide', 'none'
    transitionDuration: 300, // 毫秒
    
    // 自动播放
    autoPlay: false,
    autoPlayInterval: 5000, // 毫秒
    
    // 是否显示页码
    showPageNumber: true,
    
    // 导航配置
    navigation: {
        enabled: true,
        showDots: true,
        showChapterTitle: true
    },
    
    // 页脚配置
    footer: {
        enabled: true,
        author: "", // 在 HTML 中设置
        title: "汇报日期：" + new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
        paper_name: "" // 在 HTML 中设置
    },
    
    // 键盘快捷键
    keyboard: {
        enabled: true,
        shortcuts: {
            next: ['ArrowRight', ' ', 'Enter'],
            prev: ['ArrowLeft'],
            first: ['Home'],
            last: ['End'],
            toggleFullscreen: ['f', 'F']
        }
    },
    
    // 外部库配置
    libraries: {
        mathjax: {
            enabled: true,
            cdn: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js'
        },
        prism: {
            enabled: true,
            theme: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-one-light.min.css',
            cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js',
            languages: ['python', 'javascript', 'css', 'java'] // 需要加载的语言
        }
    }
};

// MathJax 配置
window.MathJax = {
    loader: { load: ['input/tex', 'output/svg'] },
    tex: { 
        inlineMath: [['$', '$']], 
        displayMath: [['$$', '$$']] 
    },
    svg: { scale: 1, displayAlign: 'center' }
};

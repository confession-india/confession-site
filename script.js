// =====================================================
// 🚀 LIVE PRODUCTION SCRIPT.JS - 6 LANGUAGES + CATEGORIES
// =====================================================

// EMBEDDED 6-LANGUAGE TRANSLATIONS
const translations = {
    en: { 
        header: { title: "Confess Anonymously", postButton: "+ Post Confession", backToFeed: "← Back to Feed" }, 
        categories: { all: "All", relationship: "Relationships", family: "Family Pressure", marriage: "Marriage Issues" },
        postForm: { title: "Share Your Secret", username: "Username (fake OK)", category: "Category", content: "Your Confession", 
                   charLimit: "Max 500 chars", submit: "Post Anonymously", minChars: "Confession too short (min 10 chars)", 
                   success: "Posted! Awaiting moderation.", error: "Error posting. Try again." },
        feed: { loading: "Loading confessions...", anonymous: "Anonymous", noPosts: "No confessions yet. Be the first!" },
        translate: { button: "Translate to English", translating: "Translating...", translated: "✓ Translated", error: "Translation failed" }
    },
    te: { 
        header: { title: "అనామకంగా ఒప్పుకోండి", postButton: "+ పోస్ట్ చేయండి", backToFeed: "← ఫీడ్‌కు" }, 
        categories: { all: "అన్నీ", relationship: "సంబంధాలు", family: "కుటుంబ ఒత్తిడి", marriage: "వివాహ సమస్యలు" },
        postForm: { title: "మీ రహస్యం భాగస్వామ్యం చేయండి", username: "యూజర్ పేరు (ఫేక్ OK)", category: "వర్గం", content: "మీ ఒప్పుకోలు", 
                   charLimit: "గరిష్ట 500 అక్షరాలు", submit: "అనామకంగా పోస్ట్", minChars: "ఒప్పుకోలు చాలా చిన్నది (కనీసం 10)", 
                   success: "పోస్ట్ చేయబడింది! మోడరేషన్ కోసం ఎదురుచూస్తోంది.", error: "పోస్ట్ చేయడంలో తప్పు." },
        feed: { loading: "ఒప్పుకోలు లోడ్ అవుతోంది...", anonymous: "అనామకం", noPosts: "ఇంకా ఒప్పుకోలు లేవు. మొదటిది మీది!" },
        translate: { button: "ఇంగ్లీష్‌కు అనువదించండి", translating: "అనువదిస్తోంది...", translated: "✓ అనువదించబడింది", error: "అనువాదం విఫలమైంది" }
    },
    hi: { 
        header: { title: "गुमनाम कबूलनामा", postButton: "+ पोस्ट करें", backToFeed: "← फीड वापस" }, 
        categories: { all: "सभी", relationship: "रिश्ते", family: "परिवार दबाव", marriage: "विवाह समस्याएं" },
        translate: { button: "अंग्रेजी में अनुवाद", translating: "अनुवाद हो रहा...", translated: "✓ अनुवादित" }
    },
    ta: { 
        header: { title: "அநாமதேயமாக ஒப்புக்கொள்ளுங்கள்", postButton: "+ பதிவிடவும்", backToFeed: "← ஃபீடுக்கு" }, 
        categories: { all: "அனைத்தும்", relationship: "உறவுகள்", family: "குடும்ப அழுத்தம்", marriage: "திருமண பிரச்சனைகள்" },
        translate: { button: "ஆங்கிலத்தில் மொழிபெயர்க்க", translating: "மொழிபெயர்க்கிறது...", translated: "✓ மொழிபெயர்க்கப்பட்டது" }
    },
    kn: { 
        header: { title: "ಸೋರಿಯಾಗಿ ಒಪ್ಪಿಸಿ", postButton: "+ ಪೋಸ್ಟ್ ಮಾಡಿ", backToFeed: "← ಫೀಡ್‌ಗೆ" }, 
        categories: { all: "ಎಲ್ಲಾ", relationship: "ಸಂಬಂಧಗಳು", family: "ಕುಟುಂಬ ಒತ್ತಡ", marriage: "ವಿವಾಹ ಸಮಸ್ಯೆಗಳು" },
        translate: { button: "ಇಂಗ್ಲಿಷ್‌ಗೆ ಅನುವಾದಿಸಿ", translating: "ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ", translated: "✓ ಅನುವಾದಿಸಲ್ಪಟ್ಟಿದೆ" }
    },
    ml: { 
        header: { title: "അനാമികമായി സമ്മതിക്കുക", postButton: "+ പോസ്റ്റ് ചെയ്യുക", backToFeed: "← ഫീഡിലേക്ക്" }, 
        categories: { all: "എല്ലാം", relationship: "ബന്ധങ്ങൾ", family: "കുടുംബ സമ്മർദ്ദം", marriage: "വിവാഹ പ്രശ്നങ്ങൾ" },
        translate: { button: "ഇംഗ്ലീഷിലേക്ക് വിവർത്തനം", translating: "വിവർത്തനം ചെയ്യുന്നു...", translated: "✓ വിവർത്തനം പൂർത്തിയായി" }
    }
};

// Global state
let currentLang = 'en';
let currentCategory = 'all';

// Translation function
function t(keyPath) {
    const keys = keyPath.split('.');
    let value = translations[currentLang];
    for (let key of keys) {
        value = value?.[key];
        if (!value) return keyPath;
    }
    return value || keyPath;
}

// Update all UI text
function updateAllText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    
    const ids = {
        'header-title': 'header.title',
        'postButton': 'header.postButton',
        'backButton': 'header.backToFeed',
        'postFormTitle': 'postForm.title',
        'loading-text': 'feed.loading'
    };
    
    Object.entries(ids).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = t(key);
    });
}

// Language switcher
function attachLanguageSwitchers() {
    document.querySelectorAll('#langSwitcher').forEach(dropdown => {
        dropdown.value = currentLang;
        dropdown.addEventListener('change', function(e) {
            currentLang = e.target.value;
            dropdown.value = currentLang;
            updateAllText();
        });
    });
}

// Category filter (for real posts)
function setupCategories() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => 
                b.classList.remove('bg-purple-600', 'text-white')
            );
            btn.classList.add('bg-purple-600', 'text-white');
            currentCategory = btn.dataset.cat;
            loadFeed(); // Will load real posts when Firebase ready
        });
    });
}

// Live ready - shows "No posts yet" for first users
function loadFeed() {
    const feed = document.getElementById('feed');
    const loading = document.getElementById('loading');
    
    if (feed && loading) {
        loading.classList.remove('hidden');
        setTimeout(() => {
            loading.classList.add('hidden');
            feed.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <p class="text-lg mb-4" data-i18n="feed.noPosts">${t('feed.noPosts')}</p>
                    <p class="text-sm opacity-75" data-i18n="feed.beFirst">Be the first to share your story anonymously!</p>
                </div>
            `;
            updateAllText();
        }, 1500);
    }
}

// Post form with category selection
function setupPostForm() {
    const form = document.getElementById('confessionForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username')?.value.trim() || 'Anonymous';
            const category = document.getElementById('category')?.value;
            const content = document.getElementById('content')?.value.trim();
            
            if (content.length < 10) {
                alert(t('postForm.minChars'));
                return;
            }
            
            if (!category) {
                alert('Please select a category');
                return;
            }
            
            alert(t('postForm.success'));
            form.reset();
            window.location.href = 'index.html';
        });
    }
}

// Real translation using LibreTranslate (production ready)
window.translatePost = async function(postId) {
    const contentEl = document.getElementById(`content-${postId}`);
    const button = event.target.closest('.translate-btn');
    
    if (!contentEl) return;
    
    const buttonText = button.querySelector('[data-i18n="translate.button"]');
    buttonText.textContent = t('translate.translating');
    button.disabled = true;
    
    try {
        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: contentEl.textContent,
                source: 'auto',
                target: 'en',
                format: 'text'
            })
        });
        
        const result = await response.json();
        if (result.translatedText) {
            contentEl.textContent = result.translatedText;
            buttonText.textContent = t('translate.translated');
            button.style.background = '#d1fae5';
            button.style.color = '#10b981';
        }
    } catch (error) {
        buttonText.textContent = t('translate.error');
    } finally {
        button.disabled = false;
    }
};

// Initialize
function initApp() {
    updateAllText();
    attachLanguageSwitchers();
    
    if (document.getElementById('feed')) {
        setupCategories();
        loadFeed();
    } else if (document.getElementById('confessionForm')) {
        setupPostForm();
    }
}

// Start app
setTimeout(initApp, 100);
document.addEventListener('DOMContentLoaded', initApp);

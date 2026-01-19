// =====================================================
// 🚀 TRANSLATION & UTILITY SCRIPT
// =====================================================

const translations = {
    en: { 
        header_title: "Confess Anonymously", 
        post_btn: "+ Post Confession",
        no_posts: "No confessions yet",
        be_first: "Be the first to share!"
    ,
    te: { 
        header_title: "అనామకంగా ఒప్పుకోండి", 
        post_btn: "+ పోస్ట్ చేయండి",
        no_posts: "ఇంకా ఒప్పుకోలు లేవు",
        be_first: "మొదటిది మీది!"
    }
    // ... add others as needed
};

// Character counter for any textarea with id 'content'
const contentArea = document.getElementById('content');
if (contentArea) {
    contentArea.addEventListener('input', () => {
        const count = document.getElementById('charCount');
        if (count) count.textContent = contentArea.value.length;
    });
}

// Language Switcher Logic
const langSelect = document.getElementById('langSwitcher');
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        console.log("Language changed to:", lang);
        // Add logic here if you want to translate the page text dynamically
    });
}

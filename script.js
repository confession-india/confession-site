const firebaseConfig = { 
    apiKey: "AIzaSyA8JIiJ5sRc5Fxy6qcYAXD8_nA8ELOBwkI", 
    authDomain: "confession-india.firebaseapp.com", 
    projectId: "confession-india", 
    storageBucket: "confession-india.firebasestorage.app", 
    messagingSenderId: "345080016810", 
    appId: "1:345080016810:web:3032f570077ea8d6dd45d3" 
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.firestore();
const auth = firebase.auth();

function initGlobal() {
    const glow = document.getElementById('mouse-glow');
    window.addEventListener('mousemove', (e) => { if(glow){ glow.style.left = e.clientX+'px'; glow.style.top = e.clientY+'px'; }});

    const updateClocks = () => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        const h = document.getElementById('hyd-time'), l = document.getElementById('ldn-time');
        if(h) h.innerText = new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'Asia/Kolkata' }).format(new Date());
        if(l) l.innerText = new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Europe/London' }).format(new Date());
    };
    setInterval(updateClocks, 60000); updateClocks();
}

async function initFeed() {
    const feed = document.getElementById('confessionFeed'); 
    if(!feed) return;
    
    db.collection('confessions').where('status','==','active').orderBy('timestamp','desc').onSnapshot(snap => {
        feed.innerHTML = '';
        if(snap.empty) {
            feed.innerHTML = '<p class="text-center text-slate-400 font-bold">No secrets yet. Be the first!</p>';
            return;
        }
        snap.forEach(doc => {
            const p = doc.data();
            const card = document.createElement('div');
            card.id = doc.id;
            card.className = "confession-card p-8 rounded-[40px] mb-6 shadow-sm";
            card.innerHTML = `
                <p class="text-slate-700 text-lg font-medium leading-relaxed mb-8">"${p.content}"</p>
                <div class="flex justify-between items-center pt-6 border-t border-slate-50">
                    <button onclick="upvote('${doc.id}')" class="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-all">
                        <span class="text-xl">❤️</span><span class="font-black text-xs uppercase">${p.metoo || 0} Me Too</span>
                    </button>
                    <button onclick="openShareModal('${doc.id}', \`${p.content.replace(/'/g, "\\'")}\`, '${p.username}', '${p.language}')" class="bg-indigo-600 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase shadow-lg">Share</button>
                </div>`;
            feed.appendChild(card);
        });
    });
}

// Share Logic
let activeShare = null;
window.openShareModal = (id, text, user, lang) => {
    activeShare = { id, text, user, lang, url: `${window.location.origin}${window.location.pathname}?id=${id}` };
    document.getElementById('shareModal').classList.add('show');
};

window.shareWhatsApp = () => {
    const msg = `🔥 Confession on Confess India:\n\n"${activeShare.text.substring(0, 150)}..."\n\nRead more: ${activeShare.url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
};

window.upvote = (id) => db.collection('confessions').doc(id).update({ metoo: firebase.firestore.FieldValue.increment(1) });

// INITIALIZE EVERYTHING ON LOAD
document.addEventListener('DOMContentLoaded', () => { 
    initGlobal(); 
    initFeed(); 
});

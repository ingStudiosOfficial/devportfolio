<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

import Tooltip from './components/Tooltip.vue';

import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/icon/icon.js';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file

const openSocialLink = () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(socialIcon => {
        socialIcon.addEventListener('click', () => {
            window.open(socialIcon.dataset.href, '_blank')
        });
    });
};

onMounted(() => {
    // Initialize AOS when your app mounts
    AOS.init({
        // Optional: Settings to make your animations smoother
        duration: 500, // global duration for animations
        once: true,     // whether animation should happen only once - default
        easing: 'ease-out', // easing for AOS animations
    });
    openSocialLink();
});
</script>

<template>
    <header>
        <h1 class="header-text">Ethan Lee's Portfolio</h1>
        <Tooltip text="Home" offset="-100px">
            <template #trigger>
                <md-filled-icon-button target="_self" href="/" class="nav-button">
                    <md-icon>home</md-icon>
                </md-filled-icon-button>
            </template>
        </Tooltip>
        <Tooltip text="Projects" offset="-100px">
            <template #trigger>
                <md-filled-icon-button target="_self" href="/projects" class="nav-button">
                    <md-icon>work</md-icon>
                </md-filled-icon-button>
            </template>
        </Tooltip>
    </header>
    <main>
        <RouterView />
    </main>
    <footer>
        <button class="social-icon" data-href="https://youtube.com/@ai-turtle">
            <img src="/youtube_icon.png" class="social-icon-img"/>
        </button>
        <button class="social-icon" data-href="https://github.com/ingStudiosOfficial">
            <img src="/github_icon.png" class="social-icon-img"/>
        </button>
        <button class="social-icon" data-href="https://reddit.com/u/DouDouAndFriends">
            <img src="/reddit_icon.png" class="social-icon-img"/>
        </button>
    </footer>
</template>
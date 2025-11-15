<script setup>
import { onMounted, ref } from 'vue';

// Material Web components
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';

import Tooltip from '../components/Tooltip.vue';

import projects from '../data/projects.json' with { type: 'json' };
console.log('Projects:', projects);

import loadedTechnologies from '../data/technologies.json' with { type: 'json' };
console.log('Technologies:', loadedTechnologies);

const latestProjects = ref([]);
const technologies = ref([]);
const trackPaused = ref(false);

const aboutMeSection = ref(null);
const projectsSection = ref(null);
const techStackSection = ref(null);
const contactSection = ref(null);

const sectionRefsMap = {
    aboutMeSection,
    projectsSection,
    techStackSection,
    contactSection
};

const sections = ref([
    {
        "name": "About Me",
        "ref": "aboutMeSection"
    },
    {
        "name": "My Latest Projects",
        "ref": "projectsSection"
    },
    {
        "name": "My Tech Stack",
        "ref": "techStackSection"
    },
    {
        "name": "Contact Me",
        "ref": "contactSection"
    }
])

function displayLatestProjects() {
    const projectsArray = projects.slice(-3);
    latestProjects.value = projectsArray;
}

function displayTechnologies() {
    technologies.value = loadedTechnologies;
}

function goToProject(link) {
    window.open(link, '_blank');
}

function scrollDownwards() {
    if (aboutMeSection.value) {
        aboutMeSection.value.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function navigateToSection(sectionToNavigate) {
    sectionToNavigate = sectionRefsMap[sectionToNavigate];
    if (sectionToNavigate.value) {
        sectionToNavigate.value.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

onMounted(() => {
    displayLatestProjects();
    displayTechnologies();
});
</script>

<template>
    <div class="content-wrapper">
        <div class="section first-section">
            <div>
                <div class="greeting-section">
                    <h1 class="greeting-header">Hi, I'm <span class="word-emphasis">Ethan</span></h1>
                    <p class="greeting-captions">a <span class="word-emphasis">full-stack web developer</span> who makes weird stuff.</p>
                </div>
                <md-filled-tonal-button class="continue-button" @click="scrollDownwards()">Continue</md-filled-tonal-button>
            </div>
            <div class="table-of-contents">
                <ol>
                    <li v-for="section in sections" @click="navigateToSection(section.ref)" class="section-link">
                        {{ section.name }}
                    </li>
                </ol>
            </div>
        </div>
        <div class="section-variant" ref="aboutMeSection">
            <h1 class="section-header" data-aos="fade-right" data-aos-delay="500">About Me</h1>
            <p class="section-paragraph" data-aos="fade-right" data-aos-delay="500">I mainly do <span class="word-emphasis">web projects</span> such as <span class="word-emphasis">web applications</span> and <span class="word-emphasis">Chrome Extensions</span>. I also have experience working with <span class="word-emphasis">Go</span>, <span class="word-emphasis">Python</span>, <span class="word-emphasis">Java</span>, and <span class="word-emphasis">Lua</span>.</p>
            <p class="section-paragraph" data-aos="fade-right" data-aos-delay="500">I mainly use <span class="word-emphasis">Python</span> for <span class="word-emphasis">machine learning</span>, <span class="word-emphasis">data analysis</span>, and <span class="word-emphasis">child proccesses</span> to make use of Python's extensive libraries.</p>
            <p class="section-paragraph" data-aos="fade-right" data-aos-delay="500">Some <span class="word-emphasis">Java</span> CLI programmes I created include a <span class="word-emphasis">task manager in your terminal</span> and a <span class="word-emphasis">CSV viewer</span>.</p>
            <p class="section-paragraph" data-aos="fade-right" data-aos-delay="500">I also made a <span class="word-emphasis">Discord bot</span> with <span class="word-emphasis">DiscordGo</span> and <span class="word-emphasis">Go</span>.</p>
        </div>
        <div class="section" ref="projectsSection">
            <h1 class="section-header" data-aos="fade-right" data-aos-delay="500">My Latest Projects</h1>
            <div class="projects-div">
                <button class="project-card"
                        v-for="(project, index) in latestProjects.slice().reverse()" 
                        :key="index"
                        :data-href="project.link" 
                        @click="goToProject(project.link)"
                        data-aos="fade-up" :data-aos-delay="500 + (index * 150)">
                    <md-ripple></md-ripple>
                    <md-focus-ring style="--md-focus-ring-shape: 25px"></md-focus-ring>
                    <img :src="project.image" :alt="project.name + ' project image'" class="project-image" draggable="false"/>
                    <h2>{{ project.name }}</h2>
                    <p>{{ project.description }}</p>
                </button>
                <md-outlined-button data-aos="fade-right" data-aos-delay="500" href="/projects">
                    All Projects
                </md-outlined-button>
            </div>
        </div>
        <div class="section-variant" ref="techStackSection">
            <h1 class="section-header" data-aos="fade-right" data-aos-delay="500">My Tech Stack</h1>
            <p class="section-paragraph" data-aos="fade-right" data-aos-delay="500">My frontend tech stack includes <span class="word-emphasis">vanilla HTML, CSS, and JS</span>, but I also create projects with <span class="word-emphasis">Vue.js</span>. My backend tech stack includes <span class="word-emphasis">MongoDB (with MongoDB Atlas)</span>, <span class="word-emphasis">Node.js</span>, and <span class="word-emphasis">Express</span>. Basically <span class="word-emphasis">MEVN</span>.</p>
            <div class="infinite-carousel">
                <!-- one track -->
                <div class="carousel-track" :class="{ paused: trackPaused }"
                    @mouseenter="trackPaused = true"
                    @mouseleave="trackPaused = false">
                    <Tooltip 
                        v-for="(technology, index) in technologies"
                        :key="'track2-' + index"
                        :text="technology.name"
                        offset="25px">
                        <template #trigger>
                            <img class="technology-card"
                                :src="technology.image"
                                draggable="false"/>
                        </template>
                    </Tooltip>
                </div>
                <!-- duplicate track -->
                <div class="carousel-track" :class="{ paused: trackPaused }"
                    @mouseenter="trackPaused = true"
                    @mouseleave="trackPaused = false">
                    <Tooltip 
                        v-for="(technology, index) in technologies"
                        :key="'track2-' + index"
                        :text="technology.name"
                        offset="25px">
                        <template #trigger>
                            <img class="technology-card"
                                :src="technology.image"
                                draggable="false"/>
                        </template>
                    </Tooltip>
                </div>
            </div>
        </div>
        <div class="section" ref="contactSection">
            <h1 class="section-header" data-aos="fade-right" data-aos-delay="500">Contact Me</h1>
            <p class="section-paragraph" data-aos="fade-right" data-aos-delay="500">Interested in hearing more? Contact me for enquiries at <a href="mailto:ingstudiosofficial@gmail.com?subject=Reaching%20Out" target="_blank">ingstudiosofficial@gmail.com</a>, join my <a href="https://discord.gg/MTZ4W5nG35" target="_blank">Discord server</a>, or DM me on <a href="https://discord.com/users/1128648335096549487">Discord</a> (<span class="word-emphasis">@turtlovesturtles</span>).</p>
            <a href="https://discord.com/users/1128648335096549487" data-aos="fade-right" data-aos-delay="500" target="_blank"><img src="https://lanyard.cnrad.dev/api/1128648335096549487" /></a>
        </div>
    </div>
</template>

<style scoped>
    

    .greeting-header {
        font-size: 100px;
        margin: 0;
        animation-name: fadeInFromLeft;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
        opacity: 0;
    }

    .greeting-captions {
        font-size: 30px;
        margin: 0;
        animation-name: fadeInFromLeft;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.75s;
        animation-fill-mode: forwards;
        opacity: 0;
    }

    .word-emphasis {
        color: var(--md-sys-color-primary);
    }

    .section-header {
        font-size: 50px;
    }

    .section-paragraph {
        width: 80vw;
        font-size: 30px;
    }
    
    @keyframes fadeInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-150px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInFromRight {
        from {
            opacity: 0;
            transform: translateX(150px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        padding: 30vh 10px;
    }

    .section-variant {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--md-sys-color-surface-variant);
        color: var(--md-sys-color-on-surface-variant);
        padding: 30vh 10px;
    }

    .projects-div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        width: 80vw;
        padding: 10px;
        box-sizing: border-box;
        gap: 10px;
    }

    .project-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        border-radius: 25px;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 300px;
        text-align: center;
        outline: none;
    }

    .project-image {
        width: 50%;
        border-radius: 25px;
    }

    .infinite-carousel {
        display: flex;
        overflow: visible;
        width: 100vw;
    }

    .carousel-track {
        display: flex;
        flex-shrink: 0;
        gap: 20px;
        animation: scroll 15s linear infinite;
    }

    .carousel-track.paused {
        animation-play-state: paused;
    }

    .carousel-track:last-child {
        margin-left: 20px;
    }

    .technology-card {
        height: 100px;
        flex-shrink: 0;
    }

    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(calc(-100% - 20px)); /* Account for the gap */
        }
    }

    .continue-button {
        width: fit-content;
        animation-name: fadeInFromLeft;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.75s;
        animation-fill-mode: forwards;
        opacity: 0;
    }

    .greeting-section {
        margin-bottom: 20px;
    }

    .first-section {
        display: grid;
        grid-template-columns: 2fr 1fr;
    }

    .table-of-contents {
        background-color: var(--md-sys-color-surface-variant);
        color: var(--md-sys-color-on-surface-variant);
        border-radius: 25px;
        animation-name: fadeInFromRight;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.75s;
        animation-fill-mode: forwards;
        opacity: 0;
    }

    .section-link {
        font-size: 20px;
        cursor: pointer;
        text-decoration: underline;
    }


    @media (max-width: 768px) {
        .first-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .greeting-header {
            font-size: 50px;
        }

        .greeting-captions {
            font-size: 20px;
        }

        .section-header {
            font-size: 40px;
        }

        .section-paragraph {
            font-size: 20px;
        }

        .projects-div {
            display: flex;
            flex-direction: column;
            width: 80vw;
            gap: 10px;
        }

        .project-card {
            width: 100%;
            --aos-delay: 500ms !important;
        }

        .section, .section-variant {
            overflow: hidden;
        }
    }
</style>
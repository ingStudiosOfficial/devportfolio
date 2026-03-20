<script setup>
    import { onMounted, ref } from 'vue';

    // Material Web components
    import '@material/web/ripple/ripple.js';
    import '@material/web/focus/md-focus-ring.js';

    import projects from '../data/projects.json' with { type: 'json' };
    import labsProjects from '../data/labs_projects.json' with { type: 'json' };
    import { formatProjects } from '@/utilities/projects';
    console.log('Projects:', projects);

    const allProjects = ref([]);
    const allLabsProjects = ref([]);

    async function displayAllProjects() {
        allProjects.value = await formatProjects(projects);
        console.log('All projects:', allProjects.value);
    }

    async function displayLabsProjects() {
        allLabsProjects.value = await formatProjects(labsProjects);
        console.log('Labs projects:', labsProjects.value);
    }

    function goToProject(link) {
        window.open(link, '_blank');
    }

    onMounted(() => {
        displayAllProjects();
        displayLabsProjects();
    });
</script>

<template>
    <div class="content-wrapper">
        <h1 class="section-header" data-aos="fade-right" data-aos-delay="500">My Projects</h1>
        <div class="projects-div">
            <button class="project-card"
                    v-for="(project, index) in allProjects.slice().reverse()" 
                    :key="index"
                    :data-href="project.link" 
                    @click="goToProject(project.link)"
                    data-aos="fade-up" :data-aos-delay="500 + ((index % 3) * 150)">
                <md-ripple></md-ripple>
                <md-focus-ring style="--md-focus-ring-shape: 25px"></md-focus-ring>
                <img :src="project.image" :alt="project.name + ' project image'" class="project-image" draggable="false"/>
                <h2>{{ project.name }}<span v-if="project.stars"> ({{ project.stars }} {{ project.stars === 1 ? 'star' : 'stars' }})</span></h2>
                <p>{{ project.description }}</p>
                <p v-if="project.language">Language: {{ project.language }}</p>
            </button>
        </div>
        <h1 class="section-header" data-aos="fade-right" data-aos-delay="500">Labs Projects</h1>
        <div class="projects-div">
            <button class="project-card"
                    v-for="(project, index) in allLabsProjects.slice().reverse()" 
                    :key="index"
                    :data-href="project.link" 
                    @click="goToProject(project.link)"
                    data-aos="fade-up" :data-aos-delay="500 + ((index % 3) * 150)">
                <md-ripple></md-ripple>
                <md-focus-ring style="--md-focus-ring-shape: 25px"></md-focus-ring>
                <img :src="project.image" :alt="project.name + ' project image'" class="project-image" draggable="false"/>
                <h2>{{ project.name }}<span v-if="project.stars"> ({{ project.stars }} {{ project.stars === 1 ? 'star' : 'stars' }})</span></h2>
                <p>{{ project.description }}</p>
                <p v-if="project.language">Language: {{ project.language }}</p>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .section-header {
        font-size: 50px;
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
        justify-content: center;
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        border-radius: 25px;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        text-align: center;
        outline: none;
    }

    .project-image {
        width: 50%;
        border-radius: 25px;
    }


    @media (max-width: 768px) {
        .content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100vw;
        }

        .projects-div {
            display: flex;
            flex-direction: column;
            width: 95vw;
        }

        .project-card {
            --aos-delay: 500ms !important;
        }
    }
</style>
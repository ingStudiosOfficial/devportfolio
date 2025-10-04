<script setup>
    import { onMounted, ref } from 'vue';

    // Material Web components
    import '@material/web/ripple/ripple.js';

    import projects from '../data/projects.json' with { type: 'json' };
    console.log('Projects:', projects);

    const allProjects = ref([]);

    function displayAllProjects() {
        allProjects.value = projects;
    }

    function goToProject(link) {
        window.open(link, '_blank');
    }

    onMounted(() => {
        displayAllProjects();
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
                <img :src="project.image" :alt="project.name + ' project image'" class="project-image" draggable="false"/>
                <h2>{{ project.name }}</h2>
                <p>{{ project.description }}</p>
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
        min-height: 300px;
        text-align: center;
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
    }
</style>
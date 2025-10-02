import { createRouter, createWebHistory } from 'vue-router';
// 1. Import your View components
import HomeView from '@/views/HomeView.vue';
import ProjectsView from '@/views/ProjectsView.vue';

const router = createRouter({
    // 2. Configure the history mode for clean URLs
    // 'createWebHistory' is standard for modern single-page applications
    history: createWebHistory(import.meta.env.BASE_URL),
    
    // 3. Define the routes array
    routes: [
        {
            // The URL path
            path: '/', 
            // A name for programmatic navigation (e.g., router.push({ name: 'home' }))
            name: 'home', 
            // The component that should be rendered in <RouterView> when this path is active
            component: HomeView,
            meta: { title: "Home | Ethan Lee's Portfolio" }
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectsView,
            meta: { title: "Projects | Ethan Lee's Portfolio" }
        }
    ]
});

// src/router/index.js (After the router definition)

// This hook runs after every successful navigation
router.afterEach((to) => {
    // Check if the route has a 'title' defined in its meta field
    if (to.meta.title) {
        // Set the document title to the value from the route's meta field
        document.title = to.meta.title;
    } else {
        // Set a default fallback title if a route somehow misses the meta field
        document.title = "Ethan Lee's Portfolio"; 
    }
});

export default router;
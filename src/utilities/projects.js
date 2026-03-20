const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

export async function formatProjects(projects) {
    const headers = {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
    };

    const formattedProjects = await Promise.all(projects.map(async (project) => {
        if (!project.newFormat) {
            return project;
        }

        try {
            const repoResponse = await fetch(project.link, {
                headers: headers,
            });
            const repo = await repoResponse.json();

            const imageUrl = `${project.link}/contents/.leethana/project_logo.png`;
            const imageResponse = await fetch(imageUrl, {
                headers: headers,
            });
            const imageData = await imageResponse.json();
            
            const image = imageData.download_url;

            return {
                name: project.name,
                description: repo.description,
                image: image,
                link: repo.html_url,
                stars: repo.stargazers_count,
                language: repo.language,
            };
        } catch (error) {
            console.error(`Error formatting project ${project.name}:`, error);
            return project;
        }
    }));

    return formattedProjects;
}
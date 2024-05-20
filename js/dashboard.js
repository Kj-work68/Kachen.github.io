const owner = 'Kj-work68';
const url = `https://api.github.com/users/${owner}/repos`;

async function fetchRepos() {
    const response = await fetch(url);
    const repos = await response.json();
    return repos.map(repo => repo.name);
}

async function fetchLanguages(repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    return await response.json();
}

function mergeLanguages(languagesList) {
    const merged = {};
    languagesList.forEach(languages => {
        for (const [language, bytes] of Object.entries(languages)) {
            if (merged[language]) {
                merged[language] += bytes;
            } else {
                merged[language] = bytes;
            }
        }
    });
    return merged;
}

async function main() {
    const repos = await fetchRepos();
    const languagesPromises = repos.map(fetchLanguages);
    const languagesList = await Promise.all(languagesPromises);
    const mergedLanguages = mergeLanguages(languagesList);

    const labels = Object.keys(mergedLanguages);
    const values = Object.values(mergedLanguages);
    const colors = labels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Languages Used Across All Repositories'
                }
            }
        }
    });
}

main().catch(error => console.error('Error fetching data:', error));

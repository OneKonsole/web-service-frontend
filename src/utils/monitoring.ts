export async function getCPUUsage() {
    let url = '/prometheus-api/prometheus/api/v1/query_range?query=(instance:node_memory_utilisation:ratio{job="node-exporter", cluster=""})!=0';
    const headers = {
        'X-Scope-OrgID': 'cluster-master',
        'Authorization': 'Basic bWltaXI6bWltaXI=',
        'redirect': 'follow'
    };

    // timestamp for now
    const now = new Date().getTime() / 1000;
    // timestamp now - 24h
    const start = now - 24 * 60 * 60;
    // timestamp now - 1h
    const end = now;
    // step = 1h
    const step = 3600;

    // round to the nearest integer
    const startRounded = Math.round(start);
    const endRounded = Math.round(end);

    // append to url the start, end and step parameters
    url = url + "&" + new URLSearchParams({
        start: startRounded.toString(),
        end: endRounded.toString(),
        step: step.toString()
    });

    try {
        const response = await fetch(url, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

export async function getMemoryUsage() {
    let url = '/prometheus-api/prometheus/api/v1/query_range?query=((instance:node_cpu_utilisation:rate5m{job="node-exporter", cluster=""}*instance:node_num_cpu:sum{job="node-exporter", cluster=""}\n' +
        ')!=0)/scalar(sum(instance:node_num_cpu:sum{job="node-exporter", cluster=""}))';
    const headers = {
        'X-Scope-OrgID': 'cluster-master',
        'Authorization': 'Basic bWltaXI6bWltaXI=',
        'redirect': 'follow'
    };

    // timestamp for now
    const now = new Date().getTime() / 1000;
    // timestamp now - 24h
    const start = now - 24 * 60 * 60;
    // timestamp now - 1h
    const end = now;
    // step = 1h
    const step = 3600;

    // round to the nearest integer
    const startRounded = Math.round(start);
    const endRounded = Math.round(end);

    // append to url the start, end and step parameters
    url = url + "&" + new URLSearchParams({
        start: startRounded.toString(),
        end: endRounded.toString(),
        step: step.toString()
    });

    try {
        const response = await fetch(url, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
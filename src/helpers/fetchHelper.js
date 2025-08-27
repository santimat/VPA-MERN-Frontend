export const fetchHelper = async ({
    path,
    method = "GET",
    content,
    headers = {},
}) => {
    // Create url with host and path
    const url = `${import.meta.env.VITE_BACKEND_URL}/${path}`;

    // Only if method is post, put or patch will the headers be filled

    if (method && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        headers["Content-Type"] = "application/json";
    }

    const options = {
        method: method,
        headers,
    };

    // If there is a content and this is an object
    if (content && typeof content === "object")
        options.body = JSON.stringify(content);

    // Send fetch
    const response = await fetch(url, {
        // add options using spread operator
        ...options,
    });

    // Get the data
    const data = await response.json();

    // If response is not okay
    if (!response.ok) throw new Error(data.msg ?? "Request failed");

    // If everythin is okay return data
    return { data };
};

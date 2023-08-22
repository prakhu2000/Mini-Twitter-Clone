const base = "http://localhost:5000";

export const add_tweet = async(obj) => {
    const res = await fetch(`${base}/api/tweet/add-tweet`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}

export const my_tweets = async() => {
    const res = await fetch(`${base}/api/tweet/myTweets`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}

export const edit_tweet = async(obj) => {
    const res = await fetch(`${base}/api/tweet/edit-tweet/${obj.id}`, {
        method: 'PUT',
        body: JSON.stringify({content:obj.content}),
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}
export const delete_tweet = async(obj) => {
    const res = await fetch(`${base}/api/tweet/delete-tweet/${obj.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}
export const timeline = async(obj) => {
    const res = await fetch(`${base}/api/tweet/timeline`, {
        method: 'GET',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}
export const follow_user = async(obj) => {
    const res = await fetch(`${base}/api/tweet/follow/${obj.userId}`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}

export const unfollow_user = async(obj) => {
    const res = await fetch(`${base}/api/tweet/unfollow/${obj.userId}`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "Authorization":localStorage.getItem('token'),
        },
    });
    const ans = await res.json();
    return ans;
}

// Functions for working with data stored in index.html

// Get all articles from the data stored in index.html
function getAllArticles() {
    if (typeof articlesData !== 'undefined' && articlesData.articles) {
        return articlesData.articles;
    }
    return [];
}

// Get article by ID
function getArticleById(id) {
    const articles = getAllArticles();
    return articles.find(article => article.id === id);
}

// Load and display list of articles
function loadArticles() {
    const articles = getAllArticles();
    const articlesList = document.getElementById('articlesList');
    
    if (!articlesList) return;
    
    if (articles.length === 0) {
        articlesList.innerHTML = `
            <div class="empty-state">
                <h3>No articles yet</h3>
            </div>
        `;
        return;
    }
    
    articlesList.innerHTML = articles.map(article => {
        const date = new Date(article.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const preview = article.content.length > 200 
            ? article.content.substring(0, 200) + '...' 
            : article.content;
        
        const commentsCount = article.comments ? article.comments.length : 0;
        
        return `
            <div class="article-card" onclick="window.location.href='article.html?id=${article.id}'">
                <div class="article-card-header">
                    <a href="article.html?id=${article.id}" class="article-card-title" onclick="event.stopPropagation()">
                        ${escapeHtml(article.title)}
                    </a>
                    <div class="article-card-meta">
                        <span class="article-card-author">${escapeHtml(article.author)}</span>
                        <span>${formattedDate}</span>
                    </div>
                </div>
                <div class="article-card-preview">
                    ${escapeHtml(preview)}
                </div>
                <div class="article-card-footer">
                    <span class="comments-count">${commentsCount} ${getCommentsWord(commentsCount)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Load and display article
function loadArticle(id) {
    const article = getArticleById(id);
    const articleContent = document.getElementById('articleContent');
    
    if (!articleContent) return;
    
    if (!article) {
        articleContent.innerHTML = `
            <div class="empty-state">
                <h3>Article not found</h3>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Home</a>
            </div>
        `;
        return;
    }
    
    const date = new Date(article.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    articleContent.innerHTML = `
        <h1 class="article-title">${escapeHtml(article.title)}</h1>
        <div class="article-meta">
            <span class="article-author">Author: ${escapeHtml(article.author)}</span>
            <span>Published: ${formattedDate}</span>
        </div>
        <div class="article-content">${escapeHtml(article.content)}</div>
    `;
}

// Load and display comments
function loadComments(articleId) {
    const article = getArticleById(articleId);
    const commentsList = document.getElementById('commentsList');
    
    if (!commentsList) return;
    
    // Get comments from localStorage (user-added) and merge with article comments
    const storedComments = getStoredComments(articleId);
    const allComments = [...(article.comments || []), ...storedComments].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );
    
    if (allComments.length === 0) {
        commentsList.innerHTML = `
            <div class="empty-state">
                <p>No comments yet. Be the first!</p>
            </div>
        `;
        return;
    }
    
    commentsList.innerHTML = allComments.map(comment => {
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.author)}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-text">${escapeHtml(comment.text)}</div>
            </div>
        `;
    }).join('');
}

// Get stored comments from localStorage
function getStoredComments(articleId) {
    try {
        const stored = localStorage.getItem(`comments_${articleId}`);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

// Save comment to localStorage
function saveComment(articleId, comment) {
    try {
        const stored = getStoredComments(articleId);
        stored.push(comment);
        localStorage.setItem(`comments_${articleId}`, JSON.stringify(stored));
    } catch (error) {
        console.error('Error saving comment:', error);
    }
}

// Add comment
function addComment(articleId, author, text) {
    const newComment = {
        author: author,
        text: text,
        date: new Date().toISOString()
    };
    
    saveComment(articleId, newComment);
    return newComment;
}

// Helper functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getCommentsWord(count) {
    if (count === 1) {
        return 'comment';
    } else {
        return 'comments';
    }
}

document.addEventListener('DOMContentLoaded', function() {
  function addComment(comment) {
    const commentTag = document.createElement("li");
    commentTag.className = "comment";
    commentTag.innerText = comment;
    document.getElementById("comments-list").appendChild(commentTag);
  }

  function addFormEventListener() {
    document.getElementById('comment-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      const formData = new FormData(this);
      const jsonData = { cardId: cardId, text: formData.get('comment')};

      fetch('/.netlify/functions/postComment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData)
        })
        .then(() => {
          addComment(jsonData.text);
          this.reset();
          submitButton.disabled = false;
        })
        .catch((error) => {
          console.error('Error:', error);
          submitButton.disabled = false;
        });
    });
  }

  function getCommentsForCard() {
    const encodedCardId = encodeURIComponent(cardId);
    const encodedLastBuildDate = encodeURIComponent(lastBuildDate);

    fetch(`/.netlify/functions/getComments?cardId=${encodedCardId}&lastBuildDate=${encodedLastBuildDate}`)
      .then(response => response.json())
      .then(response => {
        response.forEach(comment => addComment(comment.text));
      });
  }

  addFormEventListener();
  getCommentsForCard();
});

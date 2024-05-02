document.addEventListener('DOMContentLoaded', function() {
  function getCommentsForCard() {
    const encodedCardId = encodeURIComponent(cardId);
    const encodedLastBuildDate = encodeURIComponent(lastBuildDate);

    fetch(`/.netlify/functions/getComments?cardId=${encodedCardId}&lastBuildDate=${encodedLastBuildDate}`)
      .then(response => response.json())
      .then(response => {
        response.forEach(comment => {
          const commentTag = document.createElement("li");
          commentTag.className = "comment";
          commentTag.innerText = comment.text;
          document.getElementById("comments-list").appendChild(commentTag);
        })
      });
  }

  getCommentsForCard();
});

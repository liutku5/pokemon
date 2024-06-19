function selectCharacter(imgSrc) {
    document.getElementById('character-img-input').value = imgSrc;
  
    const playerName = document.getElementById('player-name').value;
    document.getElementById('player-name-input').value = playerName;

    document.getElementById('character-form').submit();
}
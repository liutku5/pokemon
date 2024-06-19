function selectCharacter(imgSrc) {
    const playerName = document.getElementById('player-name').value;
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    document.getElementById('character-img-input').value = imgSrc;
    document.getElementById('player-name-input').value = playerName;
    document.getElementById('character-form').submit();
}
export function wiggleAnimation(wiggleLinkOrButton) {

wiggleLinkOrButton.addEventListener('click', function(e) {
    e.preventDefault();

    wiggleLinkOrButton.classList.remove('animate-wiggle');
    void wiggleLinkOrButton.offsetWidth;

    wiggleLinkOrButton.classList.add('animate-wiggle');
});
}
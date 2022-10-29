let src1 = "images/sea.jpg";
let src2 = "images/mountains.jpg";
let border1 = "3px solid blue";
let border2 = "3px solid red";
document.getElementById("button-click").addEventListener("click", function () {
        document.querySelector("#image").style.border = border1;
        document.getElementById("image").src = src1;
        [src1, src2] = [src2, src1];
        [border1, border2] = [border2, border1];
});
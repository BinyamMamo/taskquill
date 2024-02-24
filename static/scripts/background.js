/* background.js */
let pictures = [
    "https://img.freepik.com/free-photo/clock-face-glowing-midnight-time-up-generative-ai_188544-9607.jpg?w=1060&t=st=1708342620~exp=1708343220~hmac=b5273a30a8f8502ff918df746b9fcc0ee99cbef410710bdd8e4be45f8b32d6dc",
    "https://img.freepik.com/free-photo/brown-wooden-texture-flooring-background_53876-148157.jpg?t=st=1708756815~exp=1708760415~hmac=334b89eb9c4e2cfa186d7dbfe84bdf49ce408cf0f17f1a23436b74ac8c545dde&w=996",
    "https://img.freepik.com/free-photo/wooden-plank-textured-background-material_53876-31378.jpg?t=st=1708756747~exp=1708760347~hmac=933b4f2dcd5f1d9a40abe3edfc88bf2ab81dea68ac400752b382b449a18bb779&w=996",
    "https://images7.alphacoders.com/133/1338126.png",
    "https://img.freepik.com/free-photo/geometric-vintage-retro-background-ai-generated-image_511042-624.jpg?w=1060&t=st=1708710541~exp=1708711141~hmac=af7b278bfddc6a1cba527ac75fb3f4c7da2fe74369c28831e33b646d7bcb5e0e",
    "https://img.freepik.com/free-photo/colorful-wallpaper-background-multicolored-generative-ai_91128-2257.jpg?w=1060&t=st=1708710554~exp=1708711154~hmac=66bcc12e44e9f41c355f80db9609444b06ac74f294df230b6ea3d1bc8c391a4c",
    "https://img.freepik.com/free-vector/minimal-abstract-background-branding-product-presentation_8829-2839.jpg?t=st=1708756978~exp=1708760578~hmac=b08f8f2699249fa0b1ed92970329ce0c767f7ce4c33df963e9b83d7a0d3c291f&w=1060",
    "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-7_1562-752.jpg?w=996&t=st=1708757087~exp=1708757687~hmac=d31ef0e8ce0552dace3f297ed8f2d6b5ad276cb0262cb1947fa3dfca91a355f8",
    "https://img.freepik.com/free-photo/stone-wall-textures_74190-3553.jpg?w=996&t=st=1708710654~exp=1708711254~hmac=512577d9cbd8af7160ad0dc9ea025e258fb7ddecf731bae867c9952e71a8d919",
    "https://img.freepik.com/free-photo/leaf-nature-backgrounds-pattern-illustration-plant-backdrop-design-abstract-vibrant-green-nature-wallpaper-illustration-generative-ai_188544-12680.jpg?w=1060&t=st=1708710659~exp=1708711259~hmac=43625fe206ec6bffbfd6b827e41b87866a9739a6c6049684c40f61302910565b",
    "https://img.freepik.com/free-vector/gradient-hexagonal-background_23-2148944164.jpg?t=st=1708756599~exp=1708760199~hmac=61ab910a2f8955e2c8604e42d157fe428a6561ad24066c822113363269f7c70c&w=996",
    "https://img.freepik.com/free-vector/foliage-background_53876-91284.jpg?t=st=1708756438~exp=1708760038~hmac=4fd945c5e561f13feab53171fd90fd3536001dec7e1c2acff303b6c0e5295e5a&w=996",
    "https://img.freepik.com/free-photo/snowy-mountain-peak-starry-galaxy-majesty-generative-ai_188544-9650.jpg?t=st=1708710964~exp=1708714564~hmac=afae9d7bdce774ba466a19d15f1aedd8d560dab14a1e249485552a72ac3e70b2&w=1060",
    "https://img.freepik.com/free-photo/blossom-floral-bouquet-decoration-colorful-beautiful-flowers-background-garden-flowers-plant-pattern-wallpapers-greeting-cards-postcards-design-wedding-invites_90220-1103.jpg?t=st=1708756291~exp=1708759891~hmac=10ecb7c2c709cd5be3a7085d547767fcd284c685ccab11a6c3b6371ab931fcf4&w=1380",
    "https://img.freepik.com/free-photo/abstract-geometric-background-with-liquid-shapes-generative-ai_8829-2896.jpg?t=st=1708756182~exp=1708759782~hmac=511137b6e35cf0cdbe4e79fe3c98a7b890a745d2ef05538265f254087778864e&w=1060",
    "https://img.freepik.com/free-photo/vestrahorn-mountains-sunset-stokksnes-iceland_335224-574.jpg?t=st=1708711045~exp=1708714645~hmac=02cc4c6b9b37c308e68dbd6ebbb87f157c55a669577317357f5ef1674455458e&w=1060",
    "https://img.freepik.com/free-vector/gradient-black-backgrounds-with-golden-frames_23-2149159612.jpg?t=st=1708757537~exp=1708761137~hmac=29b80d3833088898b10c0b0e4e65eee63d665f4a25515f2cea5dc37ebbcdb39c&w=996",
    "https://img.freepik.com/free-photo/brown-wooden-planks-textured-background_53876-123111.jpg",
    "https://img.freepik.com/free-photo/texture-background_1404-94.jpg"
];

window.addEventListener("load", () => {
    var btn = document.getElementById("openGallery");
    var modal = document.getElementById("galleryModal");
    var span = modal.querySelector(".close");
    var save = modal.querySelector("#save_bg");

    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    save.onclick = function() {
        var url = document.getElementById("bg_url").value;
        if (url) {
            document.body.style.backgroundImage = "url('" + url + "')";
        }
        modal.style.display = "none";
    }
    
    document.getElementById("bg_url").addEventListener("input", () => {
        var url = document.getElementById("bg_url").value;
        if (url)
            document.body.style.backgroundImage = "url('" + url + "')";
    });
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    let gallery = document.querySelector("#galleryModal").querySelector(".gallery");

    pictures.forEach((pic) => {
        let parts = pic.split('/');
        let lastPart = parts[parts.length - 1];
        let name = lastPart.split('_')[0];
        name = name.replace("-", " ");
        console.log(name);
        let img = document.createElement("img");
        img.src = pic;
        img.onclick = function() {
            document.body.style.backgroundImage = "url('" + pic + "')";
        };
        img.ondbclick = function() {
            document.body.style.backgroundImage = "url('" + pic + "')";
            modal.style.display = "none";
        };
        gallery.appendChild(img);
    });
    gallery.querySelectorAll('img').forEach(function(img) {
        img.onerror = function() {
            this.src = 'not-found.png';
            this.width = '50px';
            this.style.height = 'auto';
        };
    });

})
function searchbg(input) {
    console.clear();
    let gallery = document.querySelector("#galleryModal").querySelector(".gallery");
    gallery.innerHTML = "";
    pictures.forEach((pic) => {
        let parts = pic.split('/');
        let lastPart = parts[parts.length - 1];
        let name = lastPart.split('_')[0];
        name = name.replace("-", " ");
        if (name.includes(input.value))
        {
            let img = document.createElement("img");
            img.src = pic;
            img.onclick = function() {
                document.body.style.backgroundImage = "url('" + pic + "')";
            };
            gallery.appendChild(img);
        }
        console.log(name + ": " + input.value);
    });
}


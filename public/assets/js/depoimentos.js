
/* Depoimentos reais - Dalbem Confeitaria */

const imagensDepoimentos = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzQnDxVdxhD9L3czDcsVSdBCJtW5LvQpqOUlXBuEQ9eWy5UZ3gfGvjB6jM-xe8_Ejke9ezcm0Y7x2e2_jqpgVyCePO812t7WNDm-TBAgZrioeehAhlvBk-L7yeTm3f35tmz9Drmv_vFVF_zjsRQqpJElJIld_QXJTZiKqNK8ioTQnoUQE2Nhc-ZnrtnS0/s1600/imagem-convertida%20(10).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhk1nY7GmG1EP3QGa18Dja1suMDwpJ7vUdEBbnbKN-al0ns-nJqPnTcUY-22s0vGogx8Tu2Y2cVcsNkq2M79GcDQ6xIe-kNroQpqCIkESKTHBnssgX3Gtc6JjWAnHO_axUZbGQtnawJQnkZ-fuUGaepMmzKy0oN8c7jxFTNPe5dNWAKYD6omg24LcAO1pI/s1600/imagem-convertida%20(9).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjs66GBCRxDBrCXDvBDNGH3c-Z7VfAclBeRIhBEOO0JJ0iPY9teLgNSdhhuDAtVsivsi1-7X1u_rgVSlMD5OlenDaHuhjXobQb_KdGpUk1xdX23cDMkbWiTHOz8B2r8gOIWjtnRPty8xiCQ-M-ynl1yHpcN1ubA6J72PcuHyG5Uym1LVKoPVTdV17Vhatc/s1600/imagem-convertida%20(8).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirxZzvJx8B5loRJR8fsz_aX452u7JHkHW91SF2P0H80ttltELtvMpzfi_xsJSdYOynC7Rm_s0Ovcrjo9PXSgFZBsS7tvASrPujGsZIYUza6L4_N0DP9WrQ9UXJJ7B4Dxv14qVfKauJlF6WonntY84jts7NNeo902zAjDrEtKqGW1lWSfP3zYpTKoiAgQ/s1600/imagem-convertida%20(7).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxhls6VRfCAmXZMnMJ3S3JiRnfxhU1VlKtcKE8FRljtbDju0LWE7jHhh9pHK9FmW6rpg25NH2EHGQWOjuQp2-bvRuq6ex03ln6gV2_VrGh72q7_gYr1aq-ebcxGF6MCVcygIFLH3XVI8FfzMxedNOT8vYoS6xfsfIBbNjl-lkrvz-QNTBojwaxEWReFqc/s1600/imagem-convertida%20(6).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpdc9sdCrBNiIy_SLIzfueIq8G7KydvdN6CQfd7gF5cz0dUxBfzwTUw7anB73yakFrcOZVccbUp3QNnXzyduO63afsQaWaOIg512ZMwSdtUdN-1qSp4mxW3DP0emB6VLj4kj78Ews_IDkL0K7NiLCkEdeo8LmUL-kA2gS0fcgO13zJ-bDWAT-aZodVuK4/s1600/imagem-convertida%20(5).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEic8DDLzDugVW_-sBf-b1HFXuy6YI5IxboeWDiaR153J8OjfmMPjdhz7ungAxdLubXVHpyDCmkP_sDgGATsrjncWicLyMaKAJLwikLodVzIEDtTDI0OyZEEBW7eGf9HGQnOQZegFqcaGhdwVSoFSOjvIeGSBsqtLx-n2r8TleyP6ID9P0mxtplcEX2YMNI/s1600/imagem-convertida%20(4).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhffvN-H9EMFkRtj6Ed_w5TxfPaQ7MeQIbF3PRmPotbSguhTuewGvhyJhwaA3glz-YsDkTvva1lOLU6IX0242_W6lD4fO85GyH67kMUGIn0dE1hk2z5FoXyuM2pRhxSi0moKcTcO7d4_yRM_rw5Nj6CArxw0Us0xaNzKrBHhGvCHfbaKI53WdD4K3lOKiE/s1600/imagem-convertida%20(3).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9dKb3OP5Zl-owl4ZT1YL_bhWUlMxoXpkP0zM-wpUihiE4ALVdls8SLA8EfbpL63O09SReTMDxO3Mi2yR3JXO57iNcB0NOEM3beIJPdRPu47U8qTNIn-miV6enwvOWl3r0QGYSRXxOgrhfwi_fnc-CMBtiB-rE4VNcautsoiNJvzbmZcEyFDTmjI1N8Z8/s1600/imagem-convertida%20(2).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3nUm2AuMkecQ5D13q9KNI7QCcBltHjp7MscQA0rIPxVTw_PCg3RUAH317GjlVxV8Yi34GZe-x9vIWaIMUy8QPH8jpz3h3F2jVkPIfJd2lcNorNT8VRfp4HV-dIvNs7zqqC34j3D6zcuBjuv0vZMLtAybrYbpQuX7RdFLcdEyIRjO0VFIk2o5KASrUP1A/s1600/imagem-convertida%20(1).webp",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirEx_GFDewuFLaOzVd5XMsP21hyCASHTkGuKKBgzEZc69-0JqSvnx5Qmtw9yqutsF7NMZKHMqfhR3qQhhUIO70ypfeMJRd1rDyEimtPk7QJkoemUYE2BW1-6xvBKieM3Oje70demqYUlv-RBdyEfLvzGQoKS4I8JNG6OqVYFXq1qI_9oGhX-zJycIhVGc/s1600/imagem-convertida.webp"
];

function iniciarDepoimentos() {
    const track = document.getElementById("depoimentos-track");
    const anterior = document.getElementById("depoimentos-prev");
    const proximo = document.getElementById("depoimentos-next");
    const contador = document.getElementById("depoimentos-count");

    if (!track || !anterior || !proximo || !contador) return;

    imagensDepoimentos.forEach((url, indice) => {
        const card = document.createElement("article");
        card.className = "depoimento-card";

        const imagem = document.createElement("img");
        imagem.src = url;
        imagem.alt = `Avaliação real de cliente da Dalbem Confeitaria, imagem ${indice + 1}`;
        imagem.loading = "lazy";
        imagem.decoding = "async";

        card.appendChild(imagem);
        track.appendChild(card);
    });

    function atualizarControles() {
        const cards = track.querySelectorAll(".depoimento-card");
        if (!cards.length) return;

        const larguraPasso =
            cards.length > 1
                ? cards[1].offsetLeft - cards[0].offsetLeft
                : cards[0].offsetWidth;

        const indiceAtual = Math.min(
            cards.length - 1,
            Math.max(0, Math.round(track.scrollLeft / larguraPasso))
        );

        contador.textContent =
            `${indiceAtual + 1} de ${imagensDepoimentos.length} avaliações`;

        anterior.disabled = track.scrollLeft <= 2;
        proximo.disabled =
            track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }

    function mover(direcao) {
        const cards = track.querySelectorAll(".depoimento-card");
        if (!cards.length) return;

        const passo =
            cards.length > 1
                ? cards[1].offsetLeft - cards[0].offsetLeft
                : cards[0].offsetWidth;

        track.scrollBy({
            left: direcao * passo,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"
        });
    }

    anterior.addEventListener("click", () => mover(-1));
    proximo.addEventListener("click", () => mover(1));

    track.addEventListener("scroll", atualizarControles, { passive: true });
    window.addEventListener("resize", atualizarControles);

    atualizarControles();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarDepoimentos);
} else {
    iniciarDepoimentos();
}

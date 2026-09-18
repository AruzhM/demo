const demoData = {

    brain: {

        verdict: "FALSE",

        confidence: "94% confidence",

        claim: "Humans only use 10% of their brain.",

        explanation:
            "There is no credible scientific evidence supporting the claim that humans use only 10% of their brain. Neuroscience research and brain imaging demonstrate activity across many different brain regions.",

        claims: [

            {
                text: "Humans use only 10% of their brain.",
                status: "CONTRADICTED"
            }

        ],

        sources: [

            {
                title: "Neuroimaging research",
                type: "Scientific evidence",
                description:
                    "Brain imaging demonstrates activity across multiple regions of the brain.",
                rating: "HIGH RELEVANCE"
            },

            {
                title: "Neuroscience research",
                type: "Scientific literature",
                description:
                    "Research does not support the idea that 90% of the human brain is unused.",
                rating: "HIGH RELEVANCE"
            },

            {
                title: "Scientific American",
                type: "Science publication",
                description:
                    "Explains the scientific origins and misconceptions surrounding the 10% myth.",
                rating: "RELIABLE"
            },

            {
                title: "Brain imaging studies",
                type: "Primary evidence",
                description:
                    "Functional brain imaging shows activity in many areas during normal tasks.",
                rating: "HIGH RELEVANCE"
            }

        ]

    },


    coffee: {

        verdict: "MISLEADING",

        confidence: "88% confidence",

        claim:
            "Drinking coffee before noon makes you live longer.",

        explanation:
            "Research has found associations between coffee consumption and some health outcomes. However, this does not establish that drinking coffee before noon causes a longer lifespan.",

        claims: [

            {
                text:
                    "Coffee consumption is associated with some health outcomes.",
                status: "SUPPORTED"
            },

            {
                text:
                    "Drinking coffee before noon increases lifespan.",
                status: "CONTRADICTED"
            },

            {
                text:
                    "Coffee before noon causes longer life.",
                status: "CONTRADICTED"
            }

        ],

        sources: [

            {
                title: "Coffee & health research",
                type: "Scientific research",
                description:
                    "Studies have reported associations between coffee consumption and health outcomes.",
                rating: "RELEVANT"
            },

            {
                title: "Epidemiological studies",
                type: "Scientific evidence",
                description:
                    "Observational evidence cannot by itself establish causation.",
                rating: "RELEVANT"
            }

        ]

    },


    cancer: {

        verdict: "INSUFFICIENT",

        confidence: "61% confidence",

        claim:
            "A newly discovered plant can cure every type of cancer.",

        explanation:
            "There is insufficient reliable evidence to support such a broad medical claim. A claim covering every type of cancer would require substantial clinical evidence across different diseases and patient populations.",

        claims: [

            {
                text:
                    "The plant can cure every type of cancer.",
                status: "CONTRADICTED"
            },

            {
                text:
                    "The plant has demonstrated medical benefits.",
                status: "SUPPORTED"
            }

        ],

        sources: [

            {
                title: "Clinical research standards",
                type: "Medical evidence",
                description:
                    "Claims of medical effectiveness require controlled clinical evidence.",
                rating: "RELEVANT"
            },

            {
                title: "Cancer research",
                type: "Scientific literature",
                description:
                    "Cancer represents many different diseases requiring different treatments.",
                rating: "RELEVANT"
            }

        ]

    }

};


/* ELEMENTS */

const inputScreen = document.getElementById("input-screen");

const loadingScreen = document.getElementById("loading-screen");

const resultScreen = document.getElementById("result-screen");

const analyzeButton = document.getElementById("analyze-btn");

const backButton = document.getElementById("back-btn");

const claimInput = document.getElementById("claim-input");


/* RESULT ELEMENTS */

const verdictLabel =
    document.getElementById("verdict-label");

const confidence =
    document.getElementById("confidence");

const verdictIcon =
    document.getElementById("verdict-icon");

const resultClaim =
    document.getElementById("result-claim");

const explanation =
    document.getElementById("explanation");

const claimsContainer =
    document.getElementById("claims-container");

const sourcesContainer =
    document.getElementById("sources-container");

const graphClaim =
    document.getElementById("graph-claim");


/* FIND DEMO */

function findDemo(claim) {

    const text = claim.toLowerCase();

    if (
        text.includes("10%") ||
        text.includes("ten percent") ||
        text.includes("brain")
    ) {
        return demoData.brain;
    }

    if (
        text.includes("coffee") ||
        text.includes("noon")
    ) {
        return demoData.coffee;
    }

    if (
        text.includes("cancer") ||
        text.includes("plant") ||
        text.includes("cure")
    ) {
        return demoData.cancer;
    }

    return demoData.brain;
}


/* SHOW RESULT */

function showResult(data) {

    verdictLabel.textContent = data.verdict;

    confidence.textContent = data.confidence;

    resultClaim.textContent = data.claim;

    explanation.textContent = data.explanation;

    graphClaim.textContent =
        data.claim.length > 30
            ? data.claim.substring(0, 30) + "..."
            : data.claim;


    /* VERDICT ICON */

    if (data.verdict === "FALSE") {

        verdictIcon.textContent = "✕";

        verdictLabel.style.color = "var(--red)";

    }

    else if (data.verdict === "MISLEADING") {

        verdictIcon.textContent = "!";

        verdictLabel.style.color = "var(--yellow)";

    }

    else {

        verdictIcon.textContent = "?";

        verdictLabel.style.color = "var(--muted)";

    }


    /* CLAIMS */

    claimsContainer.innerHTML = "";

    data.claims.forEach(claim => {

        const item = document.createElement("div");

        item.className = "claim-item";

        let statusClass = "contradicted";

        if (claim.status === "SUPPORTED") {
            statusClass = "supported";
        }

        if (claim.status === "PARTIALLY SUPPORTED") {
            statusClass = "partial";
        }

        item.innerHTML = `

            <div class="claim-text">
                ${claim.text}
            </div>

            <span class="status ${statusClass}">
                ${claim.status}
            </span>

        `;

        claimsContainer.appendChild(item);

    });


    /* SOURCES */

    sourcesContainer.innerHTML = "";

    data.sources.forEach(source => {

        const card = document.createElement("div");

        card.className = "source-card";

        card.innerHTML = `

            <div class="source-info">

                <strong>
                    ${source.title}
                </strong>

                <p>
                    ${source.type}<br>
                    ${source.description}
                </p>

            </div>

            <span class="source-rating">
                ${source.rating}
            </span>

        `;

        sourcesContainer.appendChild(card);

    });

}


/* ANALYZE */

analyzeButton.addEventListener("click", () => {

    const claim = claimInput.value.trim();

    if (claim === "") {

        claimInput.focus();

        claimInput.placeholder =
            "Please enter a claim first...";

        return;
    }


    /* INPUT → LOADING */

    inputScreen.classList.remove("active");

    resultScreen.classList.remove("active");

    loadingScreen.classList.add("active");


    /* DEMO DELAY */

    setTimeout(() => {

        const data = findDemo(claim);

        showResult(data);

        loadingScreen.classList.remove("active");

        resultScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 2200);

});


/* BACK */

backButton.addEventListener("click", () => {

    resultScreen.classList.remove("active");

    loadingScreen.classList.remove("active");

    inputScreen.classList.add("active");

    claimInput.value = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
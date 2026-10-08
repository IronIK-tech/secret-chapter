const stories = {
    bloodbound: {
        title: "Bloodbound",
        image: "images/bloodbound.jpg",
        tags: "Vampire · Gothic Romance",
        hook: "Lucien has waited three hundred years to kill a Vale. Mara has been in Bellgrave for six days.",
        description: `
            <p>For three hundred years, Lucien Veyr has kept one name at the top of his list: Vale.</p>
            <p>The family that betrayed his house, slaughtered his brothers, and disappeared before he could return the favor.</p>
            <p>Then Mara Vale arrives in Bellgrave.</p>
            <p>She knows nothing about the feud. But within days of her arrival, someone breaks into her apartment, a body turns up near the river, and Lucien realizes he isn't the only person who's been waiting for the last Vale to come home.</p>
            <p>He tells himself he's keeping her alive because he wants answers.</p>
            <p>Mara doesn't believe him.</p>
            <p>He's beginning not to believe himself either.</p>
        `
    },

    "bound-to-him": {
        title: "Bound to Him",
        image: "images/bound-to-him.jpg",
        tags: "Demon · Enemies to Lovers",
        hook: "Nora Bell didn't mean to summon a demon. In her defense, the instructions were in Latin.",
        description: `
            <p>Nora wanted the ritual to tell her whether her grandmother's ridiculous old spellbook was real.</p>
            <p>It was.</p>
            <p>Unfortunately, so is Kael.</p>
            <p>He's rude, furious about being dragged into a London apartment at two in the morning—and somehow magically attached to Nora.</p>
            <p>They can't get more than a few hundred feet apart without the bond becoming painful.</p>
            <p>Kael doesn't know how to break it. Nora certainly doesn't.</p>
            <p>There's also the minor problem that Kael was apparently in the middle of something rather important when she summoned him.</p>
            <p>Something involving a throne.</p>
            <p>And several people who would very much like him dead.</p>
            <p>Nora has work on Monday.</p>
            <p>It's going to be a long month.</p>
        `
    },

    "enemy-crown": {
        title: "The Enemy Crown",
        image: "images/the-enemy-crown.jpg",
        tags: "Fae · Arranged Marriage",
        hook: "Elara has three months to marry the man who conquered her kingdom. She plans to spend them finding a way to kill him.",
        description: `
            <p>The war ended at breakfast.</p>
            <p>By dinner, Princess Elara had lost her army, her crown, and most of the people who had spent years assuring her the capital could never fall.</p>
            <p>Prince Rhys Vaelor offers her one way to keep what remains of her kingdom.</p>
            <p>Marry him.</p>
            <p>Elara accepts for the same reason Rhys proposed: neither of them trusts the other.</p>
            <p>Inside the Fae court, however, she discovers that winning a war and surviving the peace are very different things.</p>
            <p>Someone is killing members of Rhys's council. Her own allies are keeping secrets from her.</p>
            <p>The wedding is in twelve weeks.</p>
            <p>Elara needs the truth before then. Preferably before she starts liking him.</p>
        `
    },

    "enemy-daughter": {
        title: "His Enemy's Daughter",
        image: "images/his-enemys-daughter.jpg",
        tags: "Crime Romance · Forbidden",
        hook: "Sofia Moretti has known Adrian Costa's name since she was nine. In her family, it was usually followed by a curse.",
        description: `
            <p>Sofia hasn't lived in Palermo for eleven years.</p>
            <p>She likes it that way.</p>
            <p>Then her father's car explodes outside a restaurant and, within twenty-four hours, she's back in Sicily with two suitcases, no return ticket, and Adrian Costa sitting across from her at breakfast.</p>
            <p>Adrian is thirty-seven, infuriatingly calm, and head of the family her father has spent half his life trying to destroy.</p>
            <p>He also claims Sofia is safer in his house than her own.</p>
            <p>She assumes he's lying.</p>
            <p>He assumes she'll do what she's told.</p>
            <p>They are both wrong.</p>
            <p>Because someone wants Sofia dead, and the list of people she can trust is getting shorter by the day.</p>
            <p>Adrian shouldn't be on it.</p>
            <p>That's becoming a problem.</p>
        `
    },

    dragonbound: {
        title: "Dragonbound",
        image: "images/dragonbound.jpg",
        tags: "Dragon Rider · Rivals",
        hook: "The dragon chose Lyra. Its rider took the news considerably worse.",
        description: `
            <p>Dragons don't change riders.</p>
            <p>Everyone knows that.</p>
            <p>So when Ash—the largest and least cooperative dragon in the northern fleet—walks past his decorated rider and bows his head to Lyra instead, three hundred witnesses go very quiet.</p>
            <p>Cassian Vale is not pleased.</p>
            <p>Lyra isn't particularly thrilled either. She joined the academy to become a cartographer, not to climb onto an animal capable of swallowing her whole.</p>
            <p>Unfortunately, dragons rarely explain themselves.</p>
            <p>Until the bond can be understood, Cassian is ordered to train her.</p>
            <p>He wants his dragon back.</p>
            <p>Lyra wants her old life back.</p>
            <p>Ash appears to want chaos.</p>
        `
    },

    "office-hours": {
        title: "Office Hours",
        image: "images/office-hours.jpg",
        tags: "Academic Romance · Slow Burn",
        hook: "Clara's new research supervisor has three rules. The third is not to contact him after midnight.",
        description: `
            <p>At twenty-seven, Clara Bennett has finally landed the research fellowship that might turn six years of bad coffee and temporary contracts into an actual career.</p>
            <p>There is only one complication.</p>
            <p>Dr. Alexander Reid.</p>
            <p>He's brilliant, impossible to read, and responsible for deciding whether Clara's research gets another year of funding.</p>
            <p>For the first few months, their relationship is exactly what it should be: professional, distant and occasionally unbearable.</p>
            <p>Then Clara finds a mistake buried in the data behind Alexander's most famous paper.</p>
            <p>She sends him a message at 12:14 a.m.</p>
            <p>He replies at 12:16.</p>
            <p>Neither of them gets much sleep after that.</p>
        `
    }
};
// =========================================
// ANALYTICS + RANDOMIZATION
// =========================================

const storyGrid = document.querySelector(".story-grid");

function captureEvent(name, properties = {}) {
    if (
        window.posthog &&
        typeof window.posthog.capture === "function"
    ) {
        window.posthog.capture(name, properties);
    }
}


// TRAFFIC SOURCE

const urlParams =
    new URLSearchParams(window.location.search);

const trafficProperties = {
    utm_source:
        urlParams.get("utm_source") || null,

    utm_campaign:
        urlParams.get("utm_campaign") || null,

    utm_content:
        urlParams.get("utm_content") || null,

    referrer:
        document.referrer || null
};


// RANDOMIZE STORIES ONCE PER SESSION

function shuffleCardsOncePerSession() {

    if (!storyGrid) {
        return;
    }

    const cards =
        Array.from(
            storyGrid.querySelectorAll(".story-card")
        );

    const savedOrder =
        sessionStorage.getItem(
            "secretChapterStoryOrder"
        );

    let orderedCards;


    if (savedOrder) {

        const storyIds =
            JSON.parse(savedOrder);

        orderedCards =
            storyIds
                .map((storyId) =>
                    cards.find(
                        (card) =>
                            card.dataset.story === storyId
                    )
                )
                .filter(Boolean);

    } else {

        orderedCards = [...cards];


        for (
            let i = orderedCards.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                orderedCards[i],
                orderedCards[j]
            ] = [
                orderedCards[j],
                orderedCards[i]
            ];
        }


        sessionStorage.setItem(
            "secretChapterStoryOrder",

            JSON.stringify(
                orderedCards.map(
                    (card) => card.dataset.story
                )
            )
        );
    }


    orderedCards.forEach((card) => {
        storyGrid.appendChild(card);
    });
}


function getStoryPosition(storyId) {

    const cards =
        Array.from(
            document.querySelectorAll(
                ".story-card"
            )
        );

    return (
        cards.findIndex(
            (card) =>
                card.dataset.story === storyId
        ) + 1
    );
}


shuffleCardsOncePerSession();


// LANDING

captureEvent(
    "landing_view",
    trafficProperties
);


// STORY IMPRESSIONS

document
    .querySelectorAll(".story-card")
    .forEach((card) => {

        const storyId =
            card.dataset.story;

        captureEvent(
            "story_impression",
            {
                story_id: storyId,

                story_title:
                    stories[storyId].title,

                position:
                    getStoryPosition(storyId),

                ...trafficProperties
            }
        );

    });

// ELEMENTS

const intro = document.getElementById("intro");
const storiesSection = document.getElementById("storiesSection");

const storyPreview = document.getElementById("storyPreview");
const waitlistScreen = document.getElementById("waitlistScreen");
const successScreen = document.getElementById("successScreen");

const previewCover = document.getElementById("previewCover");
const previewTags = document.getElementById("previewTags");
const previewTitle = document.getElementById("previewTitle");
const previewHook = document.getElementById("previewHook");
const previewDescription = document.getElementById("previewDescription");

const backButton = document.getElementById("backButton");
const waitlistBackButton = document.getElementById("waitlistBackButton");

const waitlistStoryTitle =
    document.getElementById("waitlistStoryTitle");

const successStoryTitle =
    document.getElementById("successStoryTitle");

const waitlistForm =
    document.getElementById("waitlistForm");

const emailInput =
    document.getElementById("emailInput");

const formError =
    document.getElementById("formError");

const exploreButton =
    document.getElementById("exploreButton");

const readButtons =
    document.querySelectorAll(".read-trigger");

const storyCards =
    document.querySelectorAll(".story-card");


let currentStoryId = null;


// HELPERS

function scrollTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function hideProductScreens() {
    storyPreview.classList.remove("active");
    waitlistScreen.classList.remove("active");
    successScreen.classList.remove("active");
}


function showHome() {
    hideProductScreens();

    intro.style.display = "";
    storiesSection.style.display = "";

    currentStoryId = null;

    scrollTop();
}


// OPEN STORY

function openStory(storyId) {
    const story = stories[storyId];

    if (!story) {
        console.error("Story not found:", storyId);
        return;
    }

    currentStoryId = storyId;

    previewCover.src = story.image;
    previewCover.alt = `${story.title} cover`;

    previewTags.textContent = story.tags;
    previewTitle.textContent = story.title;
    previewHook.textContent = story.hook;

    previewDescription.innerHTML =
        story.description;

    intro.style.display = "none";
    storiesSection.style.display = "none";

    hideProductScreens();

    storyPreview.classList.add("active");

    scrollTop();
}


// OPEN WAITLIST

function openWaitlist() {
    if (!currentStoryId) {
        return;
    }

    const story = stories[currentStoryId];

    storyPreview.classList.remove("active");

    waitlistStoryTitle.textContent =
        story.title;

    formError.textContent = "";

    waitlistScreen.classList.add("active");

    scrollTop();
}


// STORY CARDS

storyCards.forEach((card) => {

    card.addEventListener("click", () => {

        const storyId =
            card.dataset.story;

        const story =
            stories[storyId];


        captureEvent(
            "story_click",
            {
                story_id:
                    storyId,

                story_title:
                    story.title,

                position:
                    getStoryPosition(
                        storyId
                    ),

                ...trafficProperties
            }
        );


        openStory(storyId);

    });

});


// READ BUTTONS

readButtons.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                if (!currentStoryId) {
                    return;
                }


                const story =
                    stories[currentStoryId];


                const ctaPosition =
                    index === 0
                        ? "top"
                        : "bottom";


                captureEvent(
                    "read_episode_click",
                    {
                        story_id:
                            currentStoryId,

                        story_title:
                            story.title,

                        position:
                            getStoryPosition(
                                currentStoryId
                            ),

                        cta_position:
                            ctaPosition,

                        ...trafficProperties
                    }
                );


                captureEvent(
                    "waitlist_view",
                    {
                        story_id:
                            currentStoryId,

                        story_title:
                            story.title,

                        ...trafficProperties
                    }
                );


                openWaitlist();

            }
        );

    }
);


// BACK FROM STORY

backButton.addEventListener("click", showHome);


// BACK FROM WAITLIST

waitlistBackButton.addEventListener("click", () => {
    waitlistScreen.classList.remove("active");
    storyPreview.classList.add("active");

    scrollTop();
});


// EMAIL FORM

waitlistForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentStoryId) {
        return;
    }

    const email = emailInput.value.trim();

    if (!email || !emailInput.checkValidity()) {
        formError.textContent =
            "Please enter a valid email address.";
        return;
    }

    const story = stories[currentStoryId];

    formError.textContent = "";

    const submitButton =
        waitlistForm.querySelector('button[type="submit"]');

    const originalButtonText =
        submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Joining...";


    const formData = new FormData();

    formData.append(
        "access_key",
        "70937c59-f236-41ea-829d-8479b74f5d36"
    );

    formData.append(
        "email",
        email
    );

    formData.append(
        "story",
        currentStoryId
    );

    formData.append(
        "story_title",
        story.title
    );

    formData.append(
        "created_at",
        new Date().toISOString()
    );

    formData.append(
        "subject",
        `Secret Chapter waitlist — ${story.title}`
    );


    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );


        const result = await response.json();


        if (!result.success) {
            throw new Error(
                result.message || "Submission failed"
            );
        }

        // TRACK SUCCESSFUL SIGNUP

captureEvent(
    "waitlist_signup",
    {
        story_id: currentStoryId,

        story_title: story.title,

        position: getStoryPosition(
            currentStoryId
        ),

        ...trafficProperties
    }
);

        // SHOW SUCCESS

        successStoryTitle.textContent =
            story.title;

        waitlistScreen.classList.remove("active");

        successScreen.classList.add("active");

        emailInput.value = "";

        scrollTop();


    } catch (error) {

        console.error(error);

        formError.textContent =
            "Something went wrong. Please try again.";


    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            originalButtonText;
    }
});

// EXPLORE MORE

exploreButton.addEventListener("click", () => {

    captureEvent(
        "explore_more_click",
        {
            previous_story_id:
                currentStoryId,

            previous_story_title:
                currentStoryId
                    ? stories[currentStoryId].title
                    : null,

            ...trafficProperties
        }
    );

    showHome();
});
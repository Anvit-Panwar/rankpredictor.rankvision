// neet-rank.js

document.getElementById('neetPredictorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    const score = parseInt(document.getElementById('score').value);
    const category = document.getElementById('category').value;
    const stateQuota = document.querySelector('input[name="stateQuota"]:checked').value;

    // Validate input
    if (isNaN(score) || !category) {
        alert("Please enter a valid score and select a category.");
        return;
    }

    // Define score-to-rank mapping and cutoff for each category with 10-point intervals
    const rankData = {
        general: [
            { range: [700, 720], rankRange: "1-500", colleges: ["AIIMS Delhi", "Maulana Azad Medical College"] },
            { range: [680, 699], rankRange: "501-1000", colleges: ["AIIMS Bhopal", "Lady Hardinge Medical College"] },
            { range: [660, 679], rankRange: "1001-2000", colleges: ["BJ Medical College", "Grant Medical College"] },
            { range: [640, 659], rankRange: "2001-3000", colleges: ["KGMU", "Seth GS Medical College"] },
            { range: [620, 639], rankRange: "3001-5000", colleges: ["IPGMER Kolkata", "GMC Chandigarh"] },
            { range: [600, 619], rankRange: "5001-7000", colleges: ["St. John's Medical College", "GMC Amritsar"] },
            { range: [580, 599], rankRange: "7001-10000", colleges: ["Select State Colleges"] },
            { range: [560, 579], rankRange: "10001-15000", colleges: ["Regional Colleges"] },
            { range: [540, 559], rankRange: "15001-20000", colleges: ["Lower-tier State Colleges"] },
            { range: [0, 539], rankRange: "20000+", colleges: ["Consider Private Medical Colleges"] }
        ],
        obc: [
            { range: [680, 720], rankRange: "1-1000", colleges: ["AIIMS Delhi", "Maulana Azad Medical College"] },
            { range: [660, 679], rankRange: "1001-3000", colleges: ["AIIMS Bhopal", "Lady Hardinge Medical College"] },
            { range: [640, 659], rankRange: "3001-5000", colleges: ["BJ Medical College", "Grant Medical College"] },
            { range: [620, 639], rankRange: "5001-10000", colleges: ["KGMU", "Seth GS Medical College"] },
            { range: [600, 619], rankRange: "10001-15000", colleges: ["GMC Chandigarh"] },
            { range: [580, 599], rankRange: "15001-20000", colleges: ["Select State Colleges"] },
            { range: [560, 579], rankRange: "20001-25000", colleges: ["Regional Colleges"] },
            { range: [0, 559], rankRange: "25000+", colleges: ["Consider Private Medical Colleges"] }
        ],
        sc: [
            { range: [660, 720], rankRange: "1-5000", colleges: ["AIIMS Delhi", "Maulana Azad Medical College"] },
            { range: [640, 659], rankRange: "5001-10000", colleges: ["AIIMS Bhopal", "BJ Medical College"] },
            { range: [620, 639], rankRange: "10001-15000", colleges: ["KGMU", "Grant Medical College"] },
            { range: [600, 619], rankRange: "15001-20000", colleges: ["GMC Chandigarh"] },
            { range: [580, 599], rankRange: "20001-30000", colleges: ["Regional Colleges"] },
            { range: [0, 579], rankRange: "30000+", colleges: ["Limited State Colleges"] }
        ],
        st: [
            { range: [640, 720], rankRange: "1-8000", colleges: ["AIIMS Delhi", "Maulana Azad Medical College"] },
            { range: [620, 639], rankRange: "8001-15000", colleges: ["AIIMS Bhopal", "KGMU"] },
            { range: [600, 619], rankRange: "15001-20000", colleges: ["GMC Chandigarh"] },
            { range: [580, 599], rankRange: "20001-30000", colleges: ["Select State Colleges"] },
            { range: [560, 579], rankRange: "30001-40000", colleges: ["Regional Colleges"] },
            { range: [0, 559], rankRange: "40000+", colleges: ["Private Colleges"] }
        ]
    };

    // Define cutoff scores for each category
    const cutoffScores = {
        general: 138,
        obc: 115,
        sc: 90,
        st: 80
    };

    // Determine if cutoff is cleared
    const clearedCutoff = score >= cutoffScores[category];
    const cutoffStatus = clearedCutoff ? "Passed" : "Failed";

    // Adjust rank range for state quota by 10% if applicable
    const stateRankAdjustment = stateQuota === 'yes' ? 0.9 : 1;

    // Determine predicted rank and eligible colleges based on score
    let prediction = null;
    rankData[category].forEach(entry => {
        if (score >= entry.range[0] && score <= entry.range[1]) {
            let adjustedRankRange = entry.rankRange.split("-").map(rank => Math.floor(rank * stateRankAdjustment)).join("-");
            prediction = {
                rankRange: adjustedRankRange,
                colleges: entry.colleges
            };
        }
    });

    function showPopup(message) {
        document.getElementById('resultMessage').innerText = message;
        document.getElementById('resultPopup').classList.add('active');
    }
    
    function closePopup() {
        document.getElementById('resultPopup').classList.remove('active');
    }
    
    // Display result logic
    function showPopup(message) {
        document.getElementById('resultMessage').innerText = message;
        document.getElementById('resultPopup').classList.add('active');
    }
    
    function closePopup() {
        document.getElementById('resultPopup').classList.remove('active');
    }
    
    // Display result logic
    if (prediction) {
        showPopup(`Predicted Rank Range: ${prediction.rankRange}\nEligible Colleges: ${prediction.colleges.join(", ")}\nCutoff Status: ${cutoffStatus}`);
    } else {
        showPopup("Score is too low to predict an eligible rank or college.");
    }

    
    

});

function closePopup() {
    document.getElementById('resultPopup').classList.remove('active');
}


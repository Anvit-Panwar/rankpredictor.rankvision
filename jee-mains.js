// jee-main.js

document.getElementById('predictorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    const score = parseInt(document.getElementById('score').value);
    const category = document.getElementById('category').value;
    const femaleQuota = document.querySelector('input[name="femaleQuota"]:checked').value;

    // Validate input
    if (isNaN(score) || !category) {
        alert("Please enter a valid score and select a category.");
        return;
    }

    // Define score-to-rank mapping and cutoff for each category with 10-point intervals
    const rankData = {
        general: [
            { range: [290, 300], rankRange: "1-100", colleges: ["NIT Trichy", "NIT Surathkal", "NIT Warangal"] },
            { range: [280, 289], rankRange: "101-200", colleges: ["NIT Allahabad", "NIT Calicut", "NIT Rourkela"] },
            { range: [270, 279], rankRange: "201-500", colleges: ["IIIT Hyderabad", "NIT Durgapur", "NIT Patna"] },
            { range: [260, 269], rankRange: "501-1000", colleges: ["NIT Jalandhar", "IIIT Guwahati"] },
            { range: [250, 259], rankRange: "1001-2000", colleges: ["NITs, IIITs"] },
            { range: [240, 249], rankRange: "2001-3000", colleges: ["Newer NITs, IIITs"] },
            { range: [230, 239], rankRange: "3001-5000", colleges: ["Select IIITs"] },
            { range: [220, 229], rankRange: "5001-7000", colleges: ["Few NITs"] },
            { range: [210, 219], rankRange: "7001-10000", colleges: ["New NITs"] },
            { range: [0, 209], rankRange: "10000+", colleges: ["Based on cutoff"] }
        ],
        obc: [
            { range: [270, 300], rankRange: "1-500", colleges: ["NIT Trichy", "NIT Surathkal"] },
            { range: [260, 269], rankRange: "501-1000", colleges: ["NIT Allahabad", "NIT Calicut"] },
            { range: [250, 259], rankRange: "1001-1500", colleges: ["IIIT Hyderabad", "NIT Durgapur"] },
            { range: [240, 249], rankRange: "1501-3000", colleges: ["NIT Patna", "NIT Jalandhar"] },
            { range: [230, 239], rankRange: "3001-5000", colleges: ["Newer NITs"] },
            { range: [220, 229], rankRange: "5001-7000", colleges: ["IIITs"] },
            { range: [210, 219], rankRange: "7001-10000", colleges: ["Newer IIITs"] },
            { range: [0, 209], rankRange: "10000+", colleges: ["Based on cutoff"] }
        ],
        sc: [
            { range: [260, 300], rankRange: "1-1500", colleges: ["NIT Trichy", "NIT Surathkal"] },
            { range: [240, 259], rankRange: "1501-3000", colleges: ["NIT Allahabad", "NIT Calicut"] },
            { range: [220, 239], rankRange: "3001-5000", colleges: ["NIT Durgapur"] },
            { range: [200, 219], rankRange: "5001-10000", colleges: ["IIIT Hyderabad"] },
            { range: [180, 199], rankRange: "10001-15000", colleges: ["NIT Patna"] },
            { range: [150, 179], rankRange: "15001-25000", colleges: ["IIITs"] },
            { range: [0, 149], rankRange: "25000+", colleges: ["Limited colleges"] }
        ],
        st: [
            { range: [250, 300], rankRange: "1-2000", colleges: ["NIT Trichy", "NIT Surathkal"] },
            { range: [220, 249], rankRange: "2001-5000", colleges: ["NIT Allahabad"] },
            { range: [200, 219], rankRange: "5001-10000", colleges: ["IIIT Hyderabad"] },
            { range: [180, 199], rankRange: "10001-20000", colleges: ["IIITs"] },
            { range: [160, 179], rankRange: "20001-30000", colleges: ["New NITs"] },
            { range: [0, 159], rankRange: "30000+", colleges: ["Limited colleges"] }
        ]
    };

    // Define cutoff scores for each category
    const cutoffScores = {
        general: 85,
        obc: 70,
        sc: 50,
        st: 40
    };

    // Determine if cutoff is cleared
    const clearedCutoff = score >= cutoffScores[category];
    const cutoffStatus = clearedCutoff ? "Passed" : "Failed";

    // Adjust rank range for female quota by 15% if applicable
    const femaleRankAdjustment = femaleQuota === 'yes' ? 0.85 : 1;

    // Determine predicted rank and eligible colleges based on score
    let prediction = null;
    rankData[category].forEach(entry => {
        if (score >= entry.range[0] && score <= entry.range[1]) {
            let adjustedRankRange = entry.rankRange.split("-").map(rank => Math.floor(rank * femaleRankAdjustment)).join("-");
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


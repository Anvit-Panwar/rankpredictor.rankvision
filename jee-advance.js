// Consolidated functions outside event listener
function showPopup(message) {
    document.getElementById('resultMessage').innerText = message;
    document.getElementById('resultPopup').classList.add('active');
}

function closePopup() {
    document.getElementById('resultPopup').classList.remove('active');
}

document.getElementById('closePopupBtn').addEventListener('click', closePopup);

document.getElementById('predictorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form values
    const score = parseInt(document.getElementById('score').value);
    const category = document.getElementById('category').value;
    const femaleQuota = document.querySelector('input[name="femaleQuota"]:checked').value;

    // Validate input
    if (isNaN(score) || !category) {
        alert("Please enter a valid score and select a category.");
        return;
    }

    // Define comprehensive score-to-rank mapping for each category with increments of 30 marks
    const rankData = {
        general: {
            cutoff: 100,
            ranks: [
                { range: [330, 360], rankRange: "1-50", iits: ["IIT Bombay", "IIT Delhi", "IIT Madras"] },
                { range: [300, 329], rankRange: "50-100", iits: ["IIT Bombay", "IIT Delhi", "IIT Kanpur"] },
                { range: [270, 299], rankRange: "100-500", iits: ["IIT Delhi", "IIT Kanpur", "IIT Kharagpur"] },
                { range: [240, 269], rankRange: "500-1000", iits: ["IIT Roorkee", "IIT BHU", "IIT Guwahati"] },
                { range: [210, 239], rankRange: "1000-2000", iits: ["IIT Hyderabad", "IIT Indore", "IIT BHU"] },
                { range: [180, 209], rankRange: "2000-3000", iits: ["IIT Dhanbad", "IIT Ropar", "IIT Bhilai"] },
                { range: [150, 179], rankRange: "3000-4000", iits: ["IIT Patna", "IIT Jammu", "IIT Bhubaneswar"] },
                { range: [120, 149], rankRange: "4000-6000", iits: ["IIT Goa", "IIT Tirupati", "IIT Jodhpur"] },
                { range: [90, 119], rankRange: "6000-8000", iits: ["Newer IITs", "IIT Palakkad"] },
                { range: [60, 89], rankRange: "8000-10000", iits: ["No IIT"] },
                { range: [0, 59], rankRange: "10000+", iits: ["No IIT"] }
            ]
        },
        obc: {
            cutoff: 90,
            ranks: [
                { range: [300, 360], rankRange: "1-100", iits: ["IIT Bombay", "IIT Delhi", "IIT Madras"] },
                { range: [270, 299], rankRange: "100-200", iits: ["IIT Delhi", "IIT Kanpur", "IIT Kharagpur"] },
                { range: [240, 269], rankRange: "200-500", iits: ["IIT Roorkee", "IIT Guwahati", "IIT BHU"] },
                { range: [210, 239], rankRange: "500-1000", iits: ["IIT Hyderabad", "IIT Indore"] },
                { range: [180, 209], rankRange: "1000-1500", iits: ["IIT Dhanbad", "IIT Ropar"] },
                { range: [150, 179], rankRange: "1500-2500", iits: ["IIT Jammu", "IIT Bhubaneswar"] },
                { range: [120, 149], rankRange: "2500-4000", iits: ["IIT Goa", "IIT Tirupati"] },
                { range: [90, 119], rankRange: "4000-6000", iits: ["Newer IITs"] },
                { range: [60, 89], rankRange: "6000-8000", iits: ["Newer IITs"] },
                { range: [0, 59], rankRange: "8000+", iits: ["Few IITs based on category cutoff"] }
            ]
        },
        sc: {
            cutoff: 60,
            ranks: [
                { range: [250, 360], rankRange: "1-100", iits: ["IIT Bombay", "IIT Delhi", "IIT Madras"] },
                { range: [220, 249], rankRange: "100-300", iits: ["IIT Kanpur", "IIT Kharagpur", "IIT Roorkee"] },
                { range: [190, 219], rankRange: "300-700", iits: ["IIT Guwahati", "IIT BHU"] },
                { range: [160, 189], rankRange: "700-1200", iits: ["IIT Hyderabad", "IIT Indore"] },
                { range: [130, 159], rankRange: "1200-1800", iits: ["IIT Ropar", "IIT Dhanbad"] },
                { range: [100, 129], rankRange: "1800-3000", iits: ["IIT Jammu", "IIT Bhubaneswar"] },
                { range: [70, 99], rankRange: "3000-5000", iits: ["IIT Goa", "IIT Tirupati"] },
                { range: [40, 69], rankRange: "5000+", iits: ["Newer IITs"] },
                { range: [0, 39], rankRange: "5000+", iits: ["No IIT"] }
            ]
        },
        st: {
            cutoff: 60,
            ranks: [
                { range: [230, 360], rankRange: "1-100", iits: ["IIT Bombay", "IIT Delhi", "IIT Madras"] },
                { range: [200, 229], rankRange: "100-300", iits: ["IIT Kanpur", "IIT Kharagpur"] },
                { range: [170, 199], rankRange: "300-600", iits: ["IIT Roorkee", "IIT Guwahati"] },
                { range: [140, 169], rankRange: "600-1000", iits: ["IIT BHU", "IIT Hyderabad"] },
                { range: [110, 139], rankRange: "1000-1500", iits: ["IIT Ropar", "IIT Indore"] },
                { range: [80, 109], rankRange: "1500-2500", iits: ["IIT Jammu", "IIT Bhubaneswar"] },
                { range: [50, 79], rankRange: "2500-3500", iits: ["IIT Goa", "IIT Tirupati"] },
                { range: [20, 49], rankRange: "3500+", iits: ["No IIT"] },
                { range: [0, 19], rankRange: "3500+", iits: ["No IIT"] }
            ]
        }
    };

    const femaleRankAdjustment = femaleQuota === 'yes' ? 0.9 : 1;
    const categoryData = rankData[category];
    const cutoffStatus = score >= categoryData.cutoff ? "Passed" : "Failed";

    // Find prediction data using `find()`
    const prediction = categoryData.ranks.find(entry =>
        score >= entry.range[0] && score <= entry.range[1]
    );

    // Display prediction if found
    if (prediction) {
        const adjustedRankRange = prediction.rankRange.split("-")
            .map(rank => Math.floor(rank * femaleRankAdjustment)).join("-");
        showPopup(`Predicted Rank Range: ${adjustedRankRange}\nEligible Colleges: ${prediction.iits.join(", ")}\nCutoff Status: ${cutoffStatus}`);
    } else {
        showPopup(`Score is too low to predict an eligible rank or college.\nCutoff Status: ${cutoffStatus}`);
    }
});


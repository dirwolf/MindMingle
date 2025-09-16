import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

import Exercise from "./models/exercise.js";

import connectDB from "./utilities/db.js";

const exercises = [

    {

       

        "title": "Deep Breathing",

        "description": "A simple breathing exercise to calm your mind and reduce stress",

        "instructions": [

            "Find a comfortable seated position",

            "Close your eyes and take a deep breath in through your nose for 4 counts",

            "Hold your breath for 4 counts",

            "Exhale slowly through your mouth for 6 counts",

            "Repeat this cycle for 5-10 minutes"

        ],

        "duration": "5-10 minutes",

        "category": "breathing",

        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"

    },

    {

     

        "title": "Body Scan Meditation",

        "description": "A mindfulness practice that helps you become aware of physical sensations",

        "instructions": [

            "Lie down in a comfortable position",

            "Close your eyes and take a few deep breaths",

            "Start from the top of your head and slowly scan down your body",

            "Notice any sensations, tension, or relaxation in each area",

            "Continue until you've scanned your entire body"

        ],

        "duration": "10-15 minutes",

        "category": "meditation",

        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"

    },

    {

       

        "title": "Mindful Walking",

        "description": "A walking meditation that helps you stay present and aware",

        "instructions": [

            "Find a quiet place to walk, indoors or outdoors",

            "Walk at a slower pace than usual",

            "Focus on the sensation of your feet touching the ground",

            "Notice the movement of your body as you walk",

            "If your mind wanders, gently bring it back to the walking"

        ],

        "duration": "10-20 minutes",

        "category": "movement",

        "image": "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop"

    },

    {

       

        "title": "Loving-Kindness Meditation",

        "description": "A practice to cultivate compassion and positive feelings",

        "instructions": [

            "Sit comfortably and close your eyes",

            "Take a few deep breaths to center yourself",

            "Begin by directing loving-kindness to yourself",

            "Repeat these phrases silently: 'May I be happy, may I be healthy, may I be at peace'",

            "Then extend these wishes to others: 'May you be happy, may you be healthy, may you be at peace'"

        ],

        "duration": "15-20 minutes",

        "category": "meditation",

        "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"

    },

    {

       

        "title": "Progressive Muscle Relaxation",

        "description": "A technique to reduce stress and tension by systematically tensing and relaxing muscle groups",

        "instructions": [

            "Find a comfortable position, either sitting or lying down",

            "Close your eyes and take a few deep breaths",

            "Start with your toes - tense them for 5 seconds, then release",

            "Move up to your calves, thighs, abdomen, arms, and face",

            "Tense each muscle group for 5 seconds, then release and feel the relaxation",

            "End with a few deep breaths and notice the overall relaxation"

        ],

        "duration": "15-20 minutes",

        "category": "meditation",

        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"

    },

    {

       

        "title": "Mindful Eating",

        "description": "Practice mindfulness while eating to enhance your relationship with food and improve digestion",

        "instructions": [

            "Choose a small piece of food (like a raisin or piece of fruit)",

            "Before eating, examine it with all your senses",

            "Notice the color, texture, smell, and weight",

            "Take a small bite and chew slowly",

            "Pay attention to the taste, texture, and sensations",

            "Continue eating mindfully, focusing on each bite"

        ],

        "duration": "10-15 minutes",

        "category": "movement",

        "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"

    }

]


 

const seedData = async () => {

    try {

        await connectDB();

        const inserted = await Exercise.insertMany(exercises);

        console.log(`Inserted ${inserted.length} exercises`);

        process.exit();


 

    }

    catch (error) {

        console.log("Error inseeding data:", error);

        process.exit(1);


 

    }

}

seedData()
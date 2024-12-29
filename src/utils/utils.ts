
import { WordSet } from "../constants/types";
import { message } from "antd";

export const exportToJSON = (wordSets: WordSet[]) => {
  const dataStr = JSON.stringify(wordSets, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "word_sets.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromJSON = (
  e: React.ChangeEvent<HTMLInputElement>,
  setWordSets: React.Dispatch<React.SetStateAction<WordSet[]>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target?.result as string);
      if (Array.isArray(importedData)) {
        setWordSets(importedData);
        localStorage.setItem("wordSets", JSON.stringify(importedData));
        message.success("Word sets imported successfully!");
      } else {
        message.error("Invalid JSON file format!");
      }
    } catch (error) {
      message.error("Error parsing JSON file!");
    }
  };
  reader.readAsText(file);
};

export const exportToCSV = (wordSets: WordSet[]) => {
  const csvRows = ["id,name,difficulty,english,turkish"];
  wordSets.forEach((set) => {
    set.words.forEach((word) => {
      csvRows.push(`${set.id},"${set.name}",${word.english},${word.turkish}`);
    });
  });

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "word_sets.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCSV = (
  e: React.ChangeEvent<HTMLInputElement>,
  setWordSets: React.Dispatch<React.SetStateAction<WordSet[]>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target?.result as string;
      const rows = text.split("\n").slice(1); 
      const newSets: WordSet[] = [];

      rows.forEach((row) => {
        const [id, name, english, turkish] = row.split(",");
        let existingSet = newSets.find((set) => set.id === id);

        if (!existingSet) {
          existingSet = { id, name: name.replace(/"/g, ""), words: [] };
          newSets.push(existingSet);
        }

        existingSet.words.push({ english, turkish });
      });

      setWordSets(newSets);
      localStorage.setItem("wordSets", JSON.stringify(newSets));
      message.success("Word sets imported successfully!");
    } catch (error) {
      message.error("Error parsing CSV file!");
    }
  };
  reader.readAsText(file);
};

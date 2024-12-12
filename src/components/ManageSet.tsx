import React, {useState} from "react";
import {Card, Input, Button, List, Typography, message} from "antd";
import {PlusOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {WordSet, Word} from "../constants/types";


const {Title, Text} = Typography;


interface ManageSetProps {
  currentSet: WordSet;
  wordSets: WordSet[];
  setWordSets: React.Dispatch<React.SetStateAction<WordSet[]>>;
  setCurrentSet: React.Dispatch<React.SetStateAction<WordSet | null>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<"sets" | "manage" | "play" | "results">>;
}


const ManageSet: React.FC<ManageSetProps> = ({currentSet, wordSets, setWordSets, setCurrentSet, setCurrentStep}) => {
  const [newWord, setNewWord] = useState<Word>({english: "", turkish: ""});

  const addWordToSet = () => {
    const {english, turkish} = newWord;

    if (!english.trim() || !turkish.trim()) {
      message.warning("Please enter both English and Turkish words");
      return;
    }

    const updatedSet = {
      ...currentSet,
      words: [...currentSet.words, {english: english.trim(), turkish: turkish.trim()}],
    };

    setWordSets(wordSets.map(set => set.id === currentSet.id ? updatedSet : set));
    setCurrentSet(updatedSet);
    setNewWord({english: "", turkish: ""});
    message.success("Word added successfully!");
  };

  return (
    <Card
      title={
        <Title level={3} style={{textAlign: "center", color: "#1890ff"}}>
          Manage Set: {currentSet.name}
        </Title>
      }
    >
      <div style={{display: "flex", marginBottom: 20}}>
        <Input
          placeholder="English Word"
          value={newWord.english}
          onChange={(e) => setNewWord({...newWord, english: e.target.value})}
          style={{width: "45%", marginRight: "2%"}}
        />
        <Input
          placeholder="Turkish Translation"
          value={newWord.turkish}
          onChange={(e) => setNewWord({...newWord, turkish: e.target.value})}
          style={{width: "45%"}}
        />
        <Button
          type="primary"
          icon={<PlusOutlined/>}
          onClick={addWordToSet}
          style={{marginLeft: 10}}
        >
          Add Word
        </Button>
      </div>

      <List
        bordered
        dataSource={currentSet.words}
        renderItem={(word, index) => (
          <List.Item>
            <Text strong>{index + 1}. {word.english}</Text> - {word.turkish}
          </List.Item>
        )}
      />

      <div style={{marginTop: 20, textAlign: "center"}}>
        <Button
          type="primary"
          size="large"
          icon={<PlayCircleOutlined/>}
          disabled={currentSet.words.length === 0}
          onClick={() => setCurrentStep("play")}
        >
          Start Game
        </Button>
      </div>
    </Card>
  );
};

export default ManageSet;

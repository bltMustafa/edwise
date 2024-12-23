import React, {Dispatch, SetStateAction, useEffect} from "react";
import {Card, Input, Button, List, Empty, Tooltip, message, Select} from "antd";
import {
  BookOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {WordSet} from "../constants/types";


interface SetsListProps {
  wordSets: WordSet[];
  setWordSets: Dispatch<SetStateAction<WordSet[]>>;
  setCurrentSet: Dispatch<SetStateAction<WordSet | null>>;
  setCurrentStep: Dispatch<SetStateAction<"sets" | "manage" | "play" | "results">>;
}


const SetsList: React.FC<SetsListProps> = ({wordSets, setWordSets, setCurrentSet, setCurrentStep}) => {
  const [newSetName, setNewSetName] = React.useState("");
  const [newSetDifficulty, setNewSetDifficulty] = React.useState<"easy" | "medium" | "hard">("easy");

  useEffect(() => {
    const savedSets = localStorage.getItem("wordSets");
    if (savedSets) {
      try {
        const parsedSets = JSON.parse(savedSets);
        setWordSets(parsedSets);
      } catch (error) {
        console.error("Error parsing LocalStorage data:", error);
      }
    }
  }, [setWordSets]);

  const addWordSet = () => {
    if (!newSetName.trim()) {
      message.warning("Please enter a set name");
      return;
    }

    const newSet: WordSet = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSetName.trim(),
      words: [],
      difficulty: newSetDifficulty,
    };

    const updatedWordSets = [...wordSets, newSet];
    setWordSets(updatedWordSets);
    localStorage.setItem("wordSets", JSON.stringify(updatedWordSets));
    setNewSetName("");
    message.success("Set created successfully!");
  };

  return (
    <Card
      title={<div><BookOutlined/> Word Learning Sets</div>}
      extra={
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <Input
            placeholder="New Set Name"
            value={newSetName}
            onChange={(e) => setNewSetName(e.target.value)}
            style={{width: 200}}
          />
          <Select
            defaultValue="easy"
            value={newSetDifficulty}
            style={{width: 120}}
            onChange={(value) => setNewSetDifficulty(value as "easy" | "medium" | "hard")}
          >
            <Select.Option value="easy">Easy</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="hard">Hard</Select.Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined/>} onClick={addWordSet}>
            Add Set
          </Button>
        </div>
      }
    >
      {wordSets.length === 0 ? (
        <Empty description="No word sets yet. Create your first set!"/>
      ) : (
         <List
           grid={{gutter: 16, column: 3}}
           dataSource={wordSets}
           renderItem={(set) => (
             <List.Item>
               <Card
                 hoverable
                 actions={[
                   <Tooltip key="manage" title="Manage Set">
                     <BookOutlined
                       onClick={() => {
                         setCurrentSet(set);
                         setCurrentStep("manage");
                       }}
                     />
                   </Tooltip>,
                   <Tooltip key="play" title="Start Game">
                     <PlayCircleOutlined
                       onClick={() => {
                         if (set.words.length > 0) {
                           setCurrentSet(set);
                           setCurrentStep("play");
                         } else {
                           message.warning("This set has no words.");
                         }
                       }}
                     />
                   </Tooltip>,
                   <Tooltip key="delete" title="Delete Set">
                     <DeleteOutlined
                       style={{color: "red"}}
                       onClick={() => {
                         const updatedSets = wordSets.filter((s) => s.id !== set.id);
                         setWordSets(updatedSets);
                         localStorage.setItem("wordSets", JSON.stringify(updatedSets));
                       }}
                     />
                   </Tooltip>,
                 ]}
               >
                 <Card.Meta title={set.name} description={`${set.words.length} Words`}/>
               </Card>
             </List.Item>
           )}
         />
       )}
    </Card>

  );
};

export default SetsList;

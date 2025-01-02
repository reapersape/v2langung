import { useState } from "react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from "@/components/ui/dialog";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";
    import { useToast } from "@/hooks/use-toast";
    import { Trash2 } from "lucide-react";

    interface Word {
      id: string;
      term: string;
      definition: string;
    }

    interface WordList {
      id: string;
      name: string;
      words: Word[];
    }

    const Wordbook = () => {
      const [wordLists, setWordLists] = useState<WordList[]>([
        {
          id: "default",
          name: "Default List",
          words: [],
        },
      ]);
      const [selectedListId, setSelectedListId] = useState("default");
      const [newWord, setNewWord] = useState({ term: "", definition: "" });
      const [newListName, setNewListName] = useState("");
      const { toast } = useToast();

      const handleAddWord = () => {
        if (!newWord.term.trim() || !newWord.definition.trim()) {
          toast({
            title: "Please fill in both term and definition",
            variant: "destructive",
          });
          return;
        }

        setWordLists((prevLists) =>
          prevLists.map((list) =>
            list.id === selectedListId
              ? {
                  ...list,
                  words: [
                    ...list.words,
                    {
                      id: Math.random().toString(36).substring(2, 15),
                      ...newWord,
                    },
                  ],
                }
              : list
          )
        );
        setNewWord({ term: "", definition: "" });
        toast({ title: "Word added successfully!" });
      };

      const handleCreateList = () => {
        if (!newListName.trim()) {
          toast({
            title: "Please enter a list name",
            variant: "destructive",
          });
          return;
        }

        setWordLists((prevLists) => [
          ...prevLists,
          {
            id: Math.random().toString(36).substring(2, 15),
            name: newListName,
            words: [],
          },
        ]);
        setNewListName("");
        toast({ title: "List created successfully!" });
      };

      const handleDeleteWord = (wordId: string) => {
        setWordLists((prevLists) =>
          prevLists.map((list) =>
            list.id === selectedListId
              ? {
                  ...list,
                  words: list.words.filter((word) => word.id !== wordId),
                }
              : list
          )
        );
        toast({ title: "Word deleted successfully!" });
      };

      const handleDeleteList = (listId: string) => {
        if (listId === "default") {
          toast({
            title: "Cannot delete default list",
            variant: "destructive",
          });
          return;
        }
        setWordLists((prevLists) => prevLists.filter((list) => list.id !== listId));
        setSelectedListId("default");
        toast({ title: "List deleted successfully!" });
      };

      const handleSelectWordList = (listId: string) => {
        setSelectedListId(listId);
      };

      const selectedList = wordLists.find((list) => list.id === selectedListId);

      return (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Wordbook</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Word Lists</CardTitle>
                  <CardDescription>Manage your word lists</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-1">
                    {wordLists.map((list) => (
                      <li key={list.id}>
                        <Button
                          variant={list.id === selectedListId ? "destructive" : "default"}
                          className="w-full justify-between"
                          onClick={() => handleSelectWordList(list.id)}
                        >
                          {list.name}
                          {list.id !== "default" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteList(list.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Create New List
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New List</DialogTitle>
                        <DialogDescription>
                          Enter a name for your new list
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        type="text"
                        placeholder="List name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                      />
                      <DialogFooter>
                        <Button onClick={handleCreateList}>Create</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedList?.name || "Select a list"}
                  </CardTitle>
                  <CardDescription>
                    Add, edit, or delete words in this list
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Word"
                      value={newWord.term}
                      onChange={(e) =>
                        setNewWord({ ...newWord, term: e.target.value })
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Definition"
                      value={newWord.definition}
                      onChange={(e) =>
                        setNewWord({ ...newWord, definition: e.target.value })
                      }
                    />
                    <Button onClick={handleAddWord}>Add Word</Button>
                  </div>
                  {selectedList && selectedList.words.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Term</TableHead>
                          <TableHead>Definition</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedList.words.map((word) => (
                          <TableRow key={word.id}>
                            <TableCell>{word.term}</TableCell>
                            <TableCell>{word.definition}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteWord(word.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center text-gray-500">
                      No words added to this list yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    };

    export default Wordbook;

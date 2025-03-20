"use client";

// Triggering a redeployment - Joey Zamora

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";

export default function PriceTracker() {
  const [cards, setCards] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("trackedCards")) || [];
    setCards(storedCards);
  }, []);

  useEffect(() => {
    if (cards.length) {
      localStorage.setItem("trackedCards", JSON.stringify(cards));
    }
  }, [cards]);

  const fetchPrice = async (cardName) => {
    const price = (Math.random() * 50).toFixed(2);
    return { name: cardName, price };
  };

  const addCard = async () => {
    if (!input.trim()) return;
    const newCard = await fetchPrice(input);
    setCards([...cards, newCard]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">TCGplayer Price Tracker</h1>
      <div className="flex gap-2 mb-4">
        <Input className="flex-1 bg-gray-800 border-gray-700 text-white" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter card name" />
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={addCard}>Track</Button>
      </div>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left text-gray-400">Card</TableHead>
                <TableHead className="text-left text-gray-400">Market Price ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card, index) => (
                <TableRow key={index} className="hover:bg-gray-700">
                  <TableCell className="text-white">{card.name}</TableCell>
                  <TableCell className="text-white">${card.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Zap } from 'lucide-react';
import { useCallback, useEffect, useState, useRef } from 'react';

const GRID_SIZE = 10;
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_FOOD = { x: 7, y: 7 };

export default function NotFound() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const directionRef = useRef({ x: 0, y: 0 });
    const gameStartedRef = useRef(false);

    const generateFood = useCallback(() => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, [snake]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection({ x: 0, y: 0 });
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
        directionRef.current = { x: 0, y: 0 };
        gameStartedRef.current = false;
    };

    const startGame = (initialDirection = { x: 1, y: 0 }) => {
        setGameStarted(true);
        setDirection(initialDirection);
        directionRef.current = initialDirection;
        gameStartedRef.current = true;
    };

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        gameStartedRef.current = gameStarted;
    }, [gameStarted]);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const gameLoop = setInterval(() => {
            setSnake((currentSnake) => {
                const newSnake = [...currentSnake];
                const head = { ...newSnake[0] };

                head.x += directionRef.current.x;
                head.y += directionRef.current.y;

                // Check wall collision
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    setGameOver(true);
                    return currentSnake;
                }

                // Check self collision
                if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
                    setGameOver(true);
                    return currentSnake;
                }

                newSnake.unshift(head);

                // Check food collision
                if (head.x === food.x && head.y === food.y) {
                    setScore((prev) => prev + 10);
                    setFood(generateFood());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 150);

        return () => clearInterval(gameLoop);
    }, [food, gameStarted, gameOver, generateFood]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameStartedRef.current && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                switch (e.key) {
                    case 'ArrowUp':
                        startGame({ x: 0, y: -1 });
                        break;
                    case 'ArrowDown':
                        startGame({ x: 0, y: 1 });
                        break;
                    case 'ArrowLeft':
                        startGame({ x: -1, y: 0 });
                        break;
                    case 'ArrowRight':
                        startGame({ x: 1, y: 0 });
                        break;
                }
                return;
            }

            if (!gameStartedRef.current) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current.y === 0) {
                        const newDirection = { x: 0, y: -1 };
                        setDirection(newDirection);
                        directionRef.current = newDirection;
                    }
                    break;
                case 'ArrowDown':
                    if (directionRef.current.y === 0) {
                        const newDirection = { x: 0, y: 1 };
                        setDirection(newDirection);
                        directionRef.current = newDirection;
                    }
                    break;
                case 'ArrowLeft':
                    if (directionRef.current.x === 0) {
                        const newDirection = { x: -1, y: 0 };
                        setDirection(newDirection);
                        directionRef.current = newDirection;
                    }
                    break;
                case 'ArrowRight':
                    if (directionRef.current.x === 0) {
                        const newDirection = { x: 1, y: 0 };
                        setDirection(newDirection);
                        directionRef.current = newDirection;
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div className="max-w-2xl space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-9xl font-bold text-white opacity-20">404</h1>
                    <h2 className="mb-2 text-4xl font-bold text-white">Oops! Page Not Found</h2>
                    <p className="mb-8 text-xl text-blue-200">The page you're looking for seems to have vanished into the digital void.</p>
                </div>

                <Card className="border-purple-500/20 bg-black/30 p-6 backdrop-blur-sm">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            <h3 className="text-xl font-semibold">Snake Game</h3>
                            <Zap className="h-5 w-5 text-yellow-400" />
                        </div>

                        <div className="text-sm text-white">Score: {score}</div>

                        <div className="flex justify-center">
                            <div className="grid grid-cols-10 gap-1 rounded-lg bg-gray-900 p-4">
                                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                                    const x = index % GRID_SIZE;
                                    const y = Math.floor(index / GRID_SIZE);
                                    const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
                                    const isFood = food.x === x && food.y === y;
                                    const isHead = snake[0]?.x === x && snake[0]?.y === y;

                                    return (
                                        <div
                                            key={index}
                                            className={`h-4 w-4 rounded-sm ${
                                                isHead ? 'bg-green-400' : isSnake ? 'bg-green-600' : isFood ? 'bg-red-500' : 'bg-gray-800'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {!gameStarted && !gameOver && (
                            <div className="space-y-2">
                                <Button onClick={() => startGame()} className="bg-purple-600 hover:bg-purple-700">
                                    Start Game
                                </Button>
                                <p className="text-xs text-gray-300">Use arrow keys to control the snake or press any arrow key to start</p>
                            </div>
                        )}

                        {gameOver && (
                            <div className="space-y-2">
                                <p className="font-semibold text-red-400">Game Over!</p>
                                <Button onClick={resetGame} className="bg-purple-600 hover:bg-purple-700">
                                    Play Again
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

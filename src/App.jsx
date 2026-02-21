/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Minimize2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS<span className="text-emerald-500">GAMES</span></span>
          </div>

          <div className="relative flex-1 max-w-md mx-8 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest hidden sm:block">
              {filteredGames.length} Games Available
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden p-4 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/40 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Play className="w-6 h-6 text-black fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {game.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/80 px-2 py-0.5 bg-emerald-500/10 rounded-md">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Click to play instantly</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <Search className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-medium text-zinc-300">No games found</h3>
            <p className="text-zinc-500 mt-2">Try searching for something else</p>
          </div>
        )}
      </main>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl aspect-video'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-zinc-100">{selectedGame.title}</h2>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{selectedGame.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      setIsFullscreen(false);
                    }}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Game Iframe */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-white/5 bg-zinc-900/50 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>Playing on Nexus Games</span>
                <div className="flex items-center gap-4">
                  <span>Press ESC to exit</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="text-lg font-bold tracking-tight">NEXUS<span className="text-emerald-500">GAMES</span></span>
          </div>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            A minimalist collection of high-quality web games. No ads, no tracking, just play.
          </p>
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-xs">© 2026 Nexus Games. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-600 hover:text-emerald-500 transition-colors text-xs">Privacy Policy</a>
              <a href="#" className="text-zinc-600 hover:text-emerald-500 transition-colors text-xs">Terms of Service</a>
              <a href="#" className="text-zinc-600 hover:text-emerald-500 transition-colors text-xs">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

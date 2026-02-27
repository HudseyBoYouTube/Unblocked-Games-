import { useState, useMemo } from 'react';
import { Search, Gamepad2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectGame = (game) => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.title = 'DO NOT REFRESH';
      
      const doc = win.document;
      doc.body.style.margin = '0';
      doc.body.style.padding = '0';
      doc.body.style.overflow = 'hidden';
      doc.body.style.backgroundColor = '#000';

      const iframe = doc.createElement('iframe');
      iframe.src = game.url;
      iframe.style.width = '100vw';
      iframe.style.height = '100vh';
      iframe.style.border = 'none';
      iframe.style.display = 'block';
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      
      doc.body.appendChild(iframe);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#10A5F5] rounded-lg flex items-center justify-center shadow-lg shadow-[#10A5F5]/20">
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Capybara <span className="text-[#10A5F5]">Science</span></span>
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

          <div className="w-8 h-8 md:block hidden"></div> 
        </div>
      </header>

      {/* Main Container: Changed to flex-wrap to handle the large 500px cards better */}
      <main className="max-w-[1600px] mx-auto px-4 py-12 flex flex-wrap justify-center gap-12">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10 }}
                /* FIXED 500x500 SIZE: Added explicit width and height */
                className="group relative w-[500px] h-[500px] bg-zinc-900 border border-white/10 rounded-[40px] overflow-hidden cursor-pointer shadow-2xl shadow-black/50"
                onClick={() => handleSelectGame(game)}
              >
                {/* Image Container: Covers the full 500x500 area */}
                <div className="w-full h-full relative">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                      ['Community', 'sandspiel'].includes(game.id) || game.category === 'Community' ? 'object-contain p-12' : 'object-cover'
                    }`}
                  />
                  
                  {/* Play Button Overlay (Centered) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-24 h-24 bg-[#10A5F5] rounded-full flex items-center justify-center shadow-2xl shadow-[#10A5F5]/50 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-10 h-10 text-black fill-current ml-1" />
                    </div>
                  </div>

                  {/* Content Overlay: Gradient and Large Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                        {game.title}
                      </h3>
                      <span className="text-[12px] font-black uppercase tracking-widest text-[#10A5F5] px-4 py-1.5 bg-[#10A5F5]/20 rounded-full border border-[#10A5F5]/30">
                        {game.category}
                      </span>
                    </div>
                    <p className="text-lg text-zinc-400 font-medium">
                      {['request', 'report'].includes(game.id) ? 'Click to fill out instantly' : 'Click to play instantly'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="text-lg font-bold tracking-tight">Capybara <span className="text-[#10A5F5]">Science</span></span>
          </div>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            A perfect place to play unblocked games during class.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

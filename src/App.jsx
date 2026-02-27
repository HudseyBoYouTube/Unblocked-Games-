<main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Responsive Grid that matches the screenshot density */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer flex flex-col items-center text-center"
                onClick={() => handleSelectGame(game)}
              >
                {/* The Image Box: Exactly 150x150 to 200x200 depending on screen */}
                <div className="aspect-square w-full bg-zinc-900 rounded-xl overflow-hidden mb-3 shadow-lg group-hover:shadow-[#10A5F5]/20 transition-all duration-300">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full transition-transform duration-300 ${
                      ['Community', 'sandspiel'].includes(game.id) || game.category === 'Community' 
                      ? 'object-contain p-4' 
                      : 'object-cover'
                    }`}
                  />
                </div>

                {/* The Title: Bold, White, and outside the box */}
                <h3 className="text-[15px] font-bold text-zinc-100 group-hover:text-[#10A5F5] transition-colors line-clamp-1 px-1">
                  {game.title}
                </h3>
                
                {/* Optional Category Tag (Very subtle) */}
                <span className="text-[10px] text-zinc-500 font-medium mt-1 uppercase tracking-tighter">
                   {game.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

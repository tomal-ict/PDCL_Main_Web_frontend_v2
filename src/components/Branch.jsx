import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "@fontsource/ubuntu";
import { API_TOKEN, BASE_URL } from "../secrets";
import { countBranchUnits } from "../utils/branchUnits";
import logoFallback from "../assets/logo.webp";
 

const API_URL = `${BASE_URL}/api/branches?token=${API_TOKEN}`;
 


// Debounce utility hook to reduce re-renders on frequent updates
const useDebouncedValue = (value, delayMs) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);
  return debouncedValue;
};



const ProjectCardSkeleton = () => (
  <div 
    className="glass rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl animate-pulse"
    style={{
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.08), 
        rgba(255, 255, 255, 0.05),
        rgba(0, 152, 74, 0.04),
        rgba(255, 255, 255, 0.06)
      )`,
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 152, 74, 0.1)',
    }}>
    {/* Image Skeleton */}
    <div className="relative w-full bg-white/10 rounded-t-3xl" style={{ aspectRatio: '1 / 1' }}>
    </div>
    
    {/* Content Skeleton */}
    <div className="p-4 space-y-3">
      <div className="h-5 bg-white/10 rounded-2xl w-3/4 mx-auto" />
      <div className="h-3 bg-white/10 rounded-2xl w-1/2 mx-auto" />
      <div className="flex gap-2 mt-4">
        <div className="flex-1 h-8 bg-white/10 rounded-xl" />
        <div className="flex-1 h-8 bg-PDCL-green/20 rounded-xl" />
      </div>
    </div>
  </div>
);

const ProjectCard = ({ image, city, address, Hotline, heading, units }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const handleBranchClick = useCallback(() => {
      const routePath = `/${heading.replace(/\s+/g, "").toLowerCase()}`;
      navigate(routePath);
    }, [navigate, heading]);

    const toggleExpanded = useCallback((e) => {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }, [isExpanded]);

    return (
      <div
        className="relative"
        style={{
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}>
        {/* Clean Glass Card Container */}
        <div
          className="glass rounded-3xl border border-PDCL-green/20 backdrop-blur-xl overflow-visible relative group"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.98), 
              rgba(255, 255, 255, 0.95),
              rgba(0, 152, 74, 0.08),
              rgba(255, 255, 255, 0.92)
            )`,
            backdropFilter: "blur(16px) saturate(120%)",
            WebkitBackdropFilter: "blur(16px) saturate(120%)",
            border: "1px solid rgba(0, 152, 74, 0.15)",
          }}>
          {/* Enhanced 3D Border on Hover */}
          <div
            className="absolute inset-0 rounded-3xl border border-PDCL-green/0 group-hover:border-PDCL-green/40 transition-all duration-300"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(0, 152, 74, 0)",
            }}
          />

          {/* Units Badge */}
          {units > 1 && (
            <div
              className="absolute -top-2 -right-2 z-20">
              <div
                className="glass-medical px-3 py-1 rounded-2xl border border-PDCL-green/50 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0, 152, 74, 0.8), rgba(0, 152, 74, 0.6))",
                  boxShadow: "0 4px 20px rgba(0, 152, 74, 0.4)",
                }}>
                <span className="text-white text-xs font-bold font-ubuntu flex items-center gap-1">
                  <span>🏢</span>
                  {units} Units
                </span>
              </div>
            </div>
          )}

          {/* Enhanced Image Section with Square Aspect Ratio */}
          <div className="relative overflow-hidden bg-white rounded-3xl">
            <div
              className="relative w-full"
              style={{ aspectRatio: "1 / 1" }}>
              <img
                src={image}
                alt={`${heading} branch`}
                className="w-full h-full object-cover rounded-3xl p-2 object-center transition-all duration-500"
                style={{
                  aspectRatio: "1 / 1",
                }}
              />

            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="p-4 relative">
            {/* Subtle Background Pattern - Static */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(0, 152, 74, 0.03) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 70%, rgba(0, 152, 74, 0.02) 0%, transparent 50%)`,
                }}
              />
            </div>

            {/* Header with Enhanced Typography */}
            <div className="text-center mb-3 relative z-10">
              <h2 className="text-gray-800 font-ubuntu font-bold text-lg sm:text-xl mb-2 relative">
                {heading}
              </h2>

              <div
                className="glass rounded-full px-3 py-1 backdrop-blur-md border border-PDCL-green/30 inline-flex items-center gap-2 mb-2"
                style={{
                  background: "rgba(0, 152, 74, 0.05)",
                }}>
 
                <span className="text-PDCL-green font-ubuntu font-medium text-xs">
                  {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
                </span>
              </div>
            </div>

            {/* Enhanced Expandable Contact Section */}
            <>
              {isExpanded && (
                <div
                  className="overflow-hidden mb-4">
                  <div
                    className="glass rounded-2xl p-4 mb-3 border border-PDCL-green/30 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.95), 
                        rgba(0, 152, 74, 0.05),
                        rgba(255, 255, 255, 0.90)
                      )`,
                      backdropFilter: "none",
                    }}>
                    <div className="space-y-4 text-sm">
                      {[
                        { label: "Hotline", value: Hotline },
                        { label: "Address", value: address },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/20 transition-all duration-300">
                          <span className="text-PDCL-green text-lg">
                            {item.icon}
                          </span>
                          <div className="flex-1">
                            <div className="text-PDCL-green font-ubuntu font-semibold text-xs uppercase tracking-wide mb-1">
                              {item.label}
                            </div>
                            <div className="text-gray-800 font-ubuntu font-medium leading-relaxed">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-2 relative z-10">
              {/* Toggle Details Button with Morphing Effect */}
              <button
                onClick={toggleExpanded}
                className="flex-1 glass rounded-xl py-2 px-3 backdrop-blur-md border border-PDCL-green/30 font-ubuntu font-medium text-xs text-gray-700 hover:text-PDCL-green transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.15), 
                    rgba(0, 152, 74, 0.05),
                    rgba(255, 255, 255, 0.1)
                  )`,
                  backdropFilter: "blur(15px)",
                }}>
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <span>
                    {isExpanded ? "👁️" : "ℹ️"}
                  </span>
                  <span
                    key={isExpanded ? "hide" : "show"}>
                    {isExpanded ? "Hide Details" : "Show Details"}
                  </span>
                </span>
              </button>

              {/* Explore Button with Advanced Effects */}
              <button
                onClick={handleBranchClick}
                className="flex-1 glass-medical rounded-xl py-2 px-3 backdrop-blur-md border border-PDCL-green/50 font-ubuntu font-bold text-xs text-white transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(0, 152, 74, 0.8), 
                    rgba(0, 152, 74, 0.6),
                    rgba(0, 152, 74, 0.7)
                  )`,
                  backdropFilter: "blur(15px)",
                  boxShadow:
                    "0 4px 20px rgba(0, 152, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}>
                <span className="flex items-center justify-center gap-2 relative z-10">
                  
                  <span>Explore Branch</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

ProjectCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  Hotline: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  units: PropTypes.number.isRequired,
};

const FilterControls = ({
    filterInsideDhaka,
    filterOutsideDhaka,
    searchTerm,
    onInsideDhakaToggle,
    onOutsideDhakaToggle,
    onSearchChange,
    insideDhakaCount,
    outsideDhakaCount,
    totalUnits,
    filteredTotalUnits
  }) => (
    <div 
      className="sticky top-[70px] z-40 mx-4 sm:mx-6 lg:mx-8 xl:mx-auto xl:max-w-6xl mb-8"
    >
      {/* Floating Glass Search Container */}
      <div 
        className="glass rounded-3xl p-6 backdrop-blur-xl border border-PDCL-green/20 shadow-depth-4"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95), 
            rgba(255, 255, 255, 0.90),
            rgba(0, 152, 74, 0.08),
            rgba(255, 255, 255, 0.92)
          )`,
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 152, 74, 0.15)',
          boxShadow: `
            0 8px 32px rgba(0, 152, 74, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 0 1px rgba(0, 152, 74, 0.2)
          `,
        }}>
        
        {/* Search Bar */}
        <div className="flex flex-col space-y-6">
          {/* Main Search Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-PDCL-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="block w-full pl-12 pr-4 py-4 text-gray-800 placeholder-gray-500 bg-white/80 border border-PDCL-green/30 rounded-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-PDCL-green focus:border-PDCL-green font-ubuntu transition-all duration-300"
              type="text"
              placeholder="Search branches by name or location..."
              value={searchTerm}
              onChange={onSearchChange}
              style={{
                backdropFilter: 'blur(15px)',
                boxShadow: 'inset 0 2px 10px rgba(0, 152, 74, 0.05)',
              }}
            />
            <div 
              className="absolute inset-0 rounded-2xl border-2 border-PDCL-green/0 group-focus-within:border-PDCL-green/50 transition-all duration-300 pointer-events-none"
            />
          </div>
          
          {/* Filter Chips & Stats */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2 rounded-full font-ubuntu font-medium text-sm transition-all duration-300 border-2 backdrop-blur-md ${
                  filterInsideDhaka 
                    ? 'bg-PDCL-green text-white border-PDCL-green shadow-[0_0_15px_rgba(0,152,74,0.3)]' 
                    : 'bg-white/80 border-PDCL-green/30 text-gray-700 hover:bg-PDCL-green/5 hover:border-PDCL-green/50'
                }`}
                onClick={onInsideDhakaToggle}
                style={{
                  backdropFilter: 'blur(10px)',
                }}>
                <span className="flex items-center gap-2">
                  📍 Inside Dhaka
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      filterInsideDhaka ? 'bg-white text-PDCL-green' : 'bg-PDCL-green text-white'
                    }`}
                    key={insideDhakaCount}>
                    {insideDhakaCount}
                  </span>
                </span>
              </button>

              <button
                className={`px-4 py-2 rounded-full font-ubuntu font-medium text-sm transition-all duration-300 border-2 backdrop-blur-md ${
                  filterOutsideDhaka 
                    ? 'bg-PDCL-green text-white border-PDCL-green shadow-[0_0_15px_rgba(0,152,74,0.3)]' 
                    : 'bg-white/80 border-PDCL-green/30 text-gray-700 hover:bg-PDCL-green/5 hover:border-PDCL-green/50'
                }`}
                onClick={onOutsideDhakaToggle}
                style={{
                  backdropFilter: 'blur(10px)',
                }}>
                <span className="flex items-center gap-2">
                  🇧🇩 Outside Dhaka
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      filterOutsideDhaka ? 'bg-white text-PDCL-green' : 'bg-PDCL-green text-white'
                    }`}
                    key={outsideDhakaCount}>
                    {outsideDhakaCount}
                  </span>
                </span>
              </button>
            </div>
            
            {/* Live Stats Display */}
            <div 
              className="glass rounded-2xl px-4 py-2 backdrop-blur-md border border-PDCL-green/20"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 152, 74, 0.1)',
              }}>
              <span className="text-gray-700 font-ubuntu font-medium text-sm flex items-center gap-2">
                <span className="text-PDCL-green">⚡</span>
                <span className="text-PDCL-green font-semibold">
                  {filteredTotalUnits}
                </span>
                <span className="text-gray-500">of</span>
                <span>{totalUnits}</span>
                <span className="text-gray-500">units</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

FilterControls.propTypes = {
  filterInsideDhaka: PropTypes.bool.isRequired,
  filterOutsideDhaka: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onInsideDhakaToggle: PropTypes.func.isRequired,
  onOutsideDhakaToggle: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  insideDhakaCount: PropTypes.number.isRequired,
  outsideDhakaCount: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  filteredTotalUnits: PropTypes.number.isRequired,
};

const useBranchCounts = (branches) => {
  return (() => {
    const totalBranches = branches.length;
    const totalUnits = branches.reduce((sum, branch) => sum + branch.units, 0);

    const insideDhakaBranches = branches.filter(
      (b) => b.city.toLowerCase() === "dhaka"
    ).length;

    const outsideDhakaBranches = totalBranches - insideDhakaBranches;

    return {
      totalBranches,
      insideDhakaBranches,
      outsideDhakaBranches,
      totalUnits,
    };
  })();
};

const Branch = () => {
  const [filterState, setFilterState] = useState({
    insideDhaka: false,
    outsideDhaka: false,
    searchTerm: "",
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data } = await axios.get(API_URL);
        if (data?.success) {
          const cleanedBranches = data.data.data.map((branch) => ({
            ...branch,
            image: branch.image || logoFallback,
            cleanedName: (branch.name ?? "").replace(/\(.*?\)/g, "").trim(),
            address: (branch.address ?? "").replace(/<[^>]*>/g, ""),
            Hotline: branch.telephone_2 || branch.telephone_1 || "N/A",
            units: countBranchUnits(branch.name),
          }));
          setBranches(cleanedBranches);
        } else {
          throw new Error("Failed to fetch branches");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleInsideDhakaToggle = useCallback(() => {
    setFilterState((prev) => ({ ...prev, insideDhaka: !prev.insideDhaka }));
  }, []);

  const handleOutsideDhakaToggle = useCallback(() => {
    setFilterState((prev) => ({ ...prev, outsideDhaka: !prev.outsideDhaka }));
  }, []);

  const handleSearchChangeImmediate = useCallback((e) => {
    setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }));
  }, []);

  const debouncedSearchTerm = useDebouncedValue(filterState.searchTerm, 800);

  const filteredBranches = (() => {
    const { insideDhaka, outsideDhaka } = filterState;

    let result = branches;

    if (insideDhaka && !outsideDhaka) {
      result = result.filter((branch) => branch.city.toLowerCase() === "dhaka");
    } else if (!insideDhaka && outsideDhaka) {
      result = result.filter((branch) => branch.city.toLowerCase() !== "dhaka");
    }

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter((branch) =>
        branch.cleanedName.toLowerCase().includes(term)
      );
    }

    return result;
  })();

  // Calculate counts
  const {
    totalBranches,
    totalUnits,
  } = useBranchCounts(branches);
  const {
    totalBranches: filteredTotalBranches,
    insideDhakaBranches: filteredInsideDhakaBranches,
    outsideDhakaBranches: filteredOutsideDhakaBranches,
    totalUnits: filteredTotalUnits,
  } = useBranchCounts(filteredBranches);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl p-4 bg-red-50 rounded-lg">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-green-100/50 relative overflow-hidden">
      {/* Subtle Background Elements - Static */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-PDCL-green/3 rounded-full blur-2xl" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-400/3 rounded-full blur-2xl" />
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-200/5 rounded-full blur-2xl" />
      
      {/* Main Container */}
      <div className="relative z-10">
        {/* Glassmorphism Header */}
        <div className="flex flex-col pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div
            className="glass-medical rounded-3xl p-8 mb-8 backdrop-blur-xl border border-PDCL-green/20 shadow-medical"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.98), 
                rgba(0, 152, 74, 0.08),
                rgba(255, 255, 255, 0.95),
                rgba(255, 255, 255, 0.97)
              )`,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 152, 74, 0.15)',
              boxShadow: `
                0 8px 32px rgba(0, 152, 74, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.9),
                inset 0 0 20px rgba(0, 152, 74, 0.05)
              `,
            }}>
            <h1
              className="text-center text-3xl sm:text-4xl md:text-5xl font-bold font-ubuntu mb-6"
              style={{
                background: 'linear-gradient(135deg, #006642, #00984a, #006642)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease-in-out infinite',
              }}>
              OUR BRANCHES
            </h1>
            
            {/* Animated Statistics */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <div
                className="glass rounded-2xl p-6 backdrop-blur-md border border-PDCL-green/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 4px 20px rgba(0, 152, 74, 0.15)',
                }}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-PDCL-green mb-2">
                    {filteredTotalBranches}/{totalBranches}
                  </div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Branches</div>
                </div>
              </div>
              
              <div
                className="glass rounded-2xl p-6 backdrop-blur-md border border-PDCL-green/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 4px 20px rgba(0, 152, 74, 0.15)',
                }}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-PDCL-green mb-2">
                    {filteredTotalUnits}
                  </div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Medical Units</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FilterControls
        filterInsideDhaka={filterState.insideDhaka}
        filterOutsideDhaka={filterState.outsideDhaka}
        searchTerm={filterState.searchTerm}
        onInsideDhakaToggle={handleInsideDhakaToggle}
        onOutsideDhakaToggle={handleOutsideDhakaToggle}
        onSearchChange={handleSearchChangeImmediate}
        insideDhakaCount={filteredInsideDhakaBranches}
        outsideDhakaCount={filteredOutsideDhakaBranches}
        totalUnits={totalUnits}
        filteredTotalUnits={filteredTotalUnits}
      />

        {/* Cards Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <ProjectCardSkeleton key={`skeleton-${i}`} />
                ))
              ) : filteredBranches.length > 0 ? (
                filteredBranches.map((branch, index) => (
                  <ProjectCard
                    key={branch.id}
                    id={index}
                    image={branch.image}
                    city={branch.city}
                    address={branch.address}
                    Hotline={branch.Hotline}
                    heading={branch.cleanedName}
                    units={branch.units}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div
                    className="glass rounded-3xl p-12 backdrop-blur-xl border border-PDCL-green/20 max-w-md mx-auto"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                    }}>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-gray-800 text-xl font-ubuntu font-bold mb-2">
                      No Branches Found
                    </h3>
                    <p className="text-gray-600 font-ubuntu">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;

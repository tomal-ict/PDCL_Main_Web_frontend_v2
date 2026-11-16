import React from "react";
import "@fontsource/ubuntu";
import { servicePartners } from "../constants/homepage";
import { API_TOKEN, BASE_URL } from "../secrets";

// Custom hooks and components
import { useHealthcareApi } from "../hooks/useApiCall";
import { PartnerSkeleton, SpinnerLoader } from "./ui/LoadingSkeleton";
import { ApiErrorDisplay, withErrorBoundary } from "./ui/ErrorBoundary";
import { PartnerLogo } from "./ui/ImageWithFallback";

/**
 * Corporate Partners Component
 * Displays healthcare organization's corporate and service partners
 * with proper error handling and accessibility features
 */
function Cor() {
  // Fetch corporate partners data with proper error handling
  const {
    data: corporatePartners,
    loading: corporateLoading,
    error: corporateError,
    retry: retryCorporatePartners,
    isRetrying: isRetryingCorporate,
  } = useHealthcareApi(`${BASE_URL}/api/partners`, {
    params: { token: API_TOKEN },
    autoFetch: true,
    transform: (data) => {
      // Ensure we have an array of partners with proper structure
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.data)
            ? data.data.data
            : [];
      if (!Array.isArray(list)) return [];
      
      return list.map((partner, index) => ({
        id: partner.id || `partner-${index}`,
        image: partner.image,
        name: partner.name || `Partner ${partner.id || index + 1}`,
        // Add alt text for accessibility
        alt: partner.alt || `${partner.name || 'Corporate partner'} logo`,
      }));
    },
  });


  // Render corporate partners section
  const renderCorporatePartners = () => {
    if (corporateLoading) {
      return (
        <div className="my-8">
          <PartnerSkeleton count={6} />
        </div>
      );
    }

    if (corporateError) {
      return (
        <ApiErrorDisplay
          error={corporateError}
          onRetry={retryCorporatePartners}
          retryLabel={isRetryingCorporate ? "Retrying..." : "Reload Partners"}
          className="my-8"
        />
      );
    }

    if (!corporatePartners || corporatePartners.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <div className="text-lg font-medium mb-2">No corporate partners available</div>
          <div className="text-sm">Please check back later for updates.</div>
        </div>
      );
    }

    // Duplicate list so there are plenty of logos to fill any screen size
    const partnersDuplicated = [...corporatePartners, ...corporatePartners];

    return (
      <div className="my-8 w-full overflow-hidden relative" aria-label="Corporate partners">
        <div className="corporate-marquee-track py-4 flex items-center">
          {/* Loop Set 1 */}
          <div className="flex items-center flex-shrink-0">
            {partnersDuplicated.map((partner, index) => (
              <div
                key={`track-1-${partner.id}-${index}`}
                className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 flex-shrink-0 flex items-center justify-center">
                <img
                  src={partner.image}
                  alt={partner.alt || `Partner ${index + 1}`}
                  className="h-12 w-auto sm:h-16 md:h-18 lg:h-20 object-contain transition-all duration-300 hover:scale-110 hover:brightness-110 filter grayscale-0"
                />
              </div>
            ))}
          </div>
          {/* Loop Set 2 (exact duplicate for seamless 100% loop) */}
          <div className="flex items-center flex-shrink-0">
            {partnersDuplicated.map((partner, index) => (
              <div
                key={`track-2-${partner.id}-${index}`}
                className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 flex-shrink-0 flex items-center justify-center">
                <img
                  src={partner.image}
                  alt={partner.alt || `Partner ${index + 1}`}
                  className="h-12 w-auto sm:h-16 md:h-18 lg:h-20 object-contain transition-all duration-300 hover:scale-110 hover:brightness-110 filter grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render service partners section
  const renderServicePartners = () => {
    if (!servicePartners || servicePartners.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <div className="text-lg font-medium mb-2">No service partners available</div>
          <div className="text-sm">Please check back later for updates.</div>
        </div>
      );
    }

    return (
      <div
        className="flex flex-wrap p-5 gap-4 max-w-screen-xl mx-auto justify-center">
        {servicePartners.map((partner) => (
          <div
            key={partner.id}
            className="w-full sm:w-[300px] p-5 h-28 flex items-center justify-center">
            <PartnerLogo
              src={partner.icon}
              alt={`${partner.name} service partner logo`}
              companyName={partner.name}
              className="max-w-full max-h-full w-auto h-auto object-contain filter hover:brightness-110 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-[150px] -mb-[10px]" role="region" aria-label="Partner organizations">
      {/* Corporate Partners Section */}
      <section aria-labelledby="corporate-partners-heading">
        <h2
          id="corporate-partners-heading"
          className="text-center text-[#00984a] font-bold mb-8 font-ubuntu text-3xl">
          Corporate Partners
        </h2>

        <div className="w-full overflow-hidden">
          {renderCorporatePartners()}
        </div>
      </section>

      {/* Service Partners Section */}
      <section 
        className="mt-20 border border-[#00984a]/30 bg-gray-100 rounded-3xl"
        aria-labelledby="service-partners-heading">
        <h2
          id="service-partners-heading"
          className="text-center text-[#00984a] font-bold pt-8 mb-8 font-ubuntu text-3xl">
          Service Partners
        </h2>

        {renderServicePartners()}
      </section>

      {/* Loading indicator for retrying corporate partners */}
      {isRetryingCorporate && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-[#00984a]/20">
          <div className="flex items-center gap-3">
            <SpinnerLoader size="small" />
            <span className="text-sm text-gray-600">Retrying partners...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Export component with error boundary
export default withErrorBoundary(Cor, "Corporate Partners");
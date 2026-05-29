import React from 'react';
import Svg, { Text as SvgText, Path, Circle, G } from 'react-native-svg';

interface RaqeemLogoProps {
  width?: number;
  height?: number;
  isDarkMode?: boolean;
  layout?: 'horizontal' | 'vertical';
  isRTL?: boolean;
}

/**
 * Procedural Raqeem CV Brand Logo Component.
 * Styled in pure dynamic iOS brand blue to match premium iOS identity.
 * Supports dynamic RTL mirroring to ensure correct reading orders in Arabic layouts.
 */
export const RaqeemLogo = ({ 
  width = 240, 
  height = 60, 
  isDarkMode = false,
  layout = 'horizontal',
  isRTL = false
}: RaqeemLogoProps) => {
  const brandBlue = isDarkMode ? '#0A84FF' : '#007AFF';

  if (layout === 'vertical') {
    return (
      <Svg width={width} height={height} viewBox="0 0 320 220" fill="none">
        {/* Large Monogram Crest Icon centered on top (Scaled 2.5x) */}
        <G transform="translate(85, 10) scale(2.5)">
          <Circle cx="30" cy="30" r="24" stroke={brandBlue} strokeWidth="2.5" />
          <Path
            d="M21,17 C21,17 33,10 38,20 C42,28 36,35 30,36 C38,39 41,48 41,48"
            stroke={brandBlue}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M23,15 L23,48"
            stroke={brandBlue}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </G>

        {/* Scaled Typographic Text centered below the crest */}
        <SvgText
          fill={brandBlue}
          fontSize="46"
          fontWeight="900"
          fontFamily="Times New Roman"
          letterSpacing="-1.8"
          x="160"
          y="190"
          textAnchor="middle"
        >
          Raqeem CV
        </SvgText>
      </Svg>
    );
  }

  // Horizontal layout (for Header navigation)
  if (isRTL) {
    // Mirrored layout for Arabic: [ Raqeem ] [ CV ] [ Icon ] (so it reads correctly from left to right)
    return (
      <Svg width={width} height={height} viewBox="0 0 280 60" fill="none">
        {/* Monogram icon mirrored to the right side (translated by 220px) */}
        <G transform="translate(220, 0)">
          <Circle cx="30" cy="30" r="24" stroke={brandBlue} strokeWidth="2.5" />
          <Path
            d="M21,17 C21,17 33,10 38,20 C42,28 36,35 30,36 C38,39 41,48 41,48"
            stroke={brandBlue}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M23,15 L23,48"
            stroke={brandBlue}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </G>

        {/* Elegant Typographic Text positioned so it reads "Raqeem CV" left-to-right, to the left of the icon */}
        <SvgText
          fill={brandBlue}
          fontSize="34"
          fontWeight="900"
          fontFamily="Times New Roman"
          letterSpacing="-1"
          x="165"
          y="42"
          textAnchor="end"
        >
          Raqeem
        </SvgText>

        <SvgText
          fill={isDarkMode ? '#E5E5EA' : '#1C1C1E'}
          fontSize="24"
          fontWeight="400"
          fontFamily="Times New Roman"
          letterSpacing="0"
          x="212"
          y="42"
          textAnchor="end"
          opacity="0.9"
        >
          CV
        </SvgText>
      </Svg>
    );
  }

  // Standard LTR Horizontal layout: [ Icon ] [ Raqeem ] [ CV ]
  return (
    <Svg width={width} height={height} viewBox="0 0 280 60" fill="none">
      {/* Mini monogram icon */}
      <Circle cx="30" cy="30" r="24" stroke={brandBlue} strokeWidth="2.5" />
      <Path
        d="M21,17 C21,17 33,10 38,20 C42,28 36,35 30,36 C38,39 41,48 41,48"
        stroke={brandBlue}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23,15 L23,48"
        stroke={brandBlue}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Elegant Typographic Text in solid brand blue */}
      <SvgText
        fill={brandBlue}
        fontSize="34"
        fontWeight="900"
        fontFamily="Times New Roman"
        letterSpacing="-1"
        x="68"
        y="42"
        textAnchor="start"
      >
        Raqeem
      </SvgText>

      <SvgText
        fill={isDarkMode ? '#E5E5EA' : '#1C1C1E'}
        fontSize="24"
        fontWeight="400"
        fontFamily="Times New Roman"
        letterSpacing="0"
        x="192"
        y="42"
        textAnchor="start"
        opacity="0.9"
      >
        CV
      </SvgText>
    </Svg>
  );
};

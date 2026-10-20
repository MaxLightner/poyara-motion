import React from 'react';
/** Generic translucent panel for dashboards and HUD overlays. */
export const Glass: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children,style}) => <div style={{background:'linear-gradient(145deg,#ffffffec,#ffffffd7)',border:'1px solid #fff',borderRadius:25,boxShadow:'0 24px 65px #001b2235',...style}}>{children}</div>;

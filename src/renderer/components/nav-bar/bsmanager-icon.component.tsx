import { memo } from "react"

export const BsManagerIcon = memo(function ({className, color1, color2}: {className: string, color1: string, color2: string}) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <g style={{fill: color1}}>
        <path d="M626.75,485.91l20.82,351.94a35.21,35.21,0,0,1-15.49,31.36L487.37,965.35l-.06,0A35.56,35.56,0,0,1,476,970.12a34.85,34.85,0,0,1-23.51-2.87L136.58,809.9a115.45,115.45,0,0,1-63.75-96.49L52,361.46a35.26,35.26,0,0,1,15.23-31.21l145.05-96.36a35.72,35.72,0,0,1,11.27-4.7,34.87,34.87,0,0,1,23.51,2.87L563,389.42a115.41,115.41,0,0,1,63.75,96.49Z"/>
        <path style={{filter: "brightness(30%)"}} d="M613.78,486.67l20.82,352a22.34,22.34,0,0,1-32.26,21.31L286.4,702.57A102.43,102.43,0,0,1,229.83,617L209,265a22.35,22.35,0,0,1,32.26-21.32L557.2,401.05A102.42,102.42,0,0,1,613.78,486.67Z"/>
    </g>
    <g style={{fill: "#fff"}}>
        <path d="M718.29,776.48,700,804.18c-40.63,39.5-87.06,67.25-133.81,90.75-87.32,43.9-203.67,77.19-249,90.34a48,48,0,0,1-26.17.16c-64-17.72-188.62-72-236.28-125.49a4.23,4.23,0,0,1,5.3-6.45c35.64,20.87,111.22,57.64,156.37,74.22,49.18,18.06,81.29,8.74,92.28-3.26a4.77,4.77,0,0,1,7.24.21c19.51,24,107.26,4.6,166.64-13C546.91,892.66,668.42,835.1,718.29,776.48Z"/>
        <path d="M522.09,933.81,374.64,989.49a3.92,3.92,0,0,0,1.44,7.58l54.62-.77a35.63,35.63,0,0,0,19-5.79l76-49.55A4,4,0,0,0,522.09,933.81Z"/>
        <path d="M218.92,195.56c-21.14.07-33.55,35.86-33.16,89.08.2,28,2.58,92.74,4.79,147.73.23,5.71-8.18,6.48-9,.81L143.13,162.47a4.38,4.38,0,0,1,7.12-4,63.63,63.63,0,0,0,21.93,11.85,4.61,4.61,0,0,0,5.9-3.72c4.2-27.7,16.63-58.74,37.35-88.74a4.36,4.36,0,0,1,7.56.69c10.86,23.87,49,103.8,93.34,152.79a4.65,4.65,0,0,1-5.62,7.22C274.14,219.18,227.7,195.54,218.92,195.56Z"/>
        <path d="M203.45,580.36a4.51,4.51,0,0,1-4.46-3.92L185.17,469.15A4.5,4.5,0,0,1,194.1,468l13.82,107.29a4.5,4.5,0,0,1-3.89,5A3.86,3.86,0,0,1,203.45,580.36Z"/>
        <path d="M577.08,54.58c-46.79,15.85-115.45,40.56-158.73,62.79a35.5,35.5,0,0,0-18.57,24.53c-3.95,19.49-11,56.09-19,107.26-.7,4.48-7.36,3.78-7.11-.75L384.33,53.68a3.78,3.78,0,0,1,7.46-.66l3.49,14.85a2.57,2.57,0,0,0,4.69.77c6.18-10,22.37-32.79,57.32-65a4.13,4.13,0,0,1,6.56,4.72L431.31,81.25s78.78-19.37,144-33.09C579.42,47.29,581,53.24,577.08,54.58Z"/>
    </g>
    <g style={{fill: color2}}>
        <path style={{filter: "brightness(60%) saturate(120%)"}} d="M947.07,410.35,889.32,758.14a35.18,35.18,0,0,1-22.06,27.15L704.83,846.94l-.06,0a35.52,35.52,0,0,1-12.06,2.11,34.83,34.83,0,0,1-22.29-8L397.25,617.55a115.43,115.43,0,0,1-40.76-108.22l57.75-347.8A35.25,35.25,0,0,1,436,134.47L598.83,72.68a35.51,35.51,0,0,1,12-2.08,34.83,34.83,0,0,1,22.29,8L906.31,302.12a115.38,115.38,0,0,1,40.76,108.23Z"/>
        <path d="M934.25,408.22,876.5,756a22.34,22.34,0,0,1-36.18,13.63L567.15,546.13a102.42,102.42,0,0,1-36.17-96L588.73,102.3a22.34,22.34,0,0,1,36.18-13.63L898.08,312.18A102.42,102.42,0,0,1,934.25,408.22Z"/>
    </g>
    <ellipse style={{fill: "#fff"}} cx="732.61" cy="429.16" rx="62.83" ry="110.73" transform="translate(-87.86 210.7) rotate(-15.45)"/>
</svg>
  )
})

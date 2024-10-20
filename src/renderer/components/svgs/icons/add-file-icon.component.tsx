import { createSvgIcon } from "../svg-icon.type";

export const AddFileIcon = createSvgIcon(( props, ref ) => {
    return (
        <svg ref={ref} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M440-357.37v80q0 17 11.5 28.5t28.5 11.5q17 0 28.5-11.5t11.5-28.5v-80h80q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5h-80v-80q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5v80h-80q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5h80ZM242.87-71.87q-37.78 0-64.39-26.61t-26.61-64.39v-634.26q0-37.78 26.61-64.39t64.39-26.61H525.8q18.22 0 34.72 6.84 16.5 6.83 29.18 19.51L781.78-669.7q12.68 12.68 19.51 29.18 6.84 16.5 6.84 34.72v442.93q0 37.78-26.61 64.39t-64.39 26.61H242.87Zm274.26-570.76v-154.5H242.87v634.26h474.26v-434.26h-154.5q-19.15 0-32.33-13.17-13.17-13.18-13.17-32.33Zm-274.26-154.5V-597.13v-200 634.26-634.26Z"/>
        </svg>
    );
})

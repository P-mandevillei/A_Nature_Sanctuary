import FocusCards from "./FocusCards";
import autopsy from "./Chloramine/pics/autopsy_enantiopus_kilesa.jpeg";

export default function Focus() {
    return <div>
        <FocusCards
            linkTo='chloramine'
            cover={autopsy}
        />
    </div>
}
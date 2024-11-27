
import { Menu } from "@mui/icons-material";

export const Header = ({openMenu}) => {
return (
    <header className="text-md bg-sidebar p-4 flex justify-between min-w-96 md:hidden">
            <Menu onClick={openMenu}></Menu>
            <h2 className="mr-12 ">OrganizAR</h2>
        </header>
)
}

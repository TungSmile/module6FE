const HeaderAdmin = () => {
    return (
        <>
            <head>
                <meta charSet="utf-8"/>
                <title>Management Admin</title>
                <link rel="icon" href="/template_admin/img/mini_logo.png" type="image/png"/>
                <link rel="stylesheet" href="/template_admin/css/bootstrap1.min.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/themefy_icon/themify-icons.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/niceselect/css/nice-select.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/owl_carousel/css/owl.carousel.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/gijgo/gijgo.min.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/font_awesome/css/all.min.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/tagsinput/tagsinput.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/datepicker/date-picker.css"/>
                <link rel="stylesheet" href="/vendors/vectormap-home/vectormap-2.0.2.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/scroll/scrollable.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/datatable/css/jquery.dataTables.min.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/datatable/css/responsive.dataTables.min.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/datatable/css/buttons.dataTables.min.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/text_editor/summernote-bs4.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/morris/morris.css"/>
                <link rel="stylesheet" href="/template_admin/vendors/material_icon/material-icons.css"/>
                <link rel="stylesheet" href="/template_admin/css/metisMenu.css"/>
                <link rel="stylesheet" href="/template_admin/css/style1.css"/>
                <link rel="stylesheet" href="/template_admin/css/colors/default.css" id="colorSkinCSS"/>
            </head>
            <body className="crm_body_bg">
                <nav className="sidebar">
                    <div className="logo d-flex justify-content-between">
                        <a className="large_logo" href="index.html">
                            <img src="../template_admin/img/logo.png" alt=""/>
                        </a>
                        <a className="small_logo" href="index.html">
                            <img src="../template_admin/img/mini_logo.png" alt=""/>
                        </a>
                        <div className="sidebar_close_icon d-lg-none">
                            <i className="ti-close"/>
                        </div>
                    </div>
                    <ul id="sidebar_menu">
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/dashboard.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>User Management </span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="index_2.html">Default</a>
                                </li>
                                <li>
                                    <a href="index_3.html">Dark Sidebar</a>
                                </li>
                                <li>
                                    <a href="index.html">Light Sidebar</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/2.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Application </span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="editor.html">editor</a>
                                </li>
                                <li>
                                    <a href="mail_box.html">Mail Box</a>
                                </li>
                                <li>
                                    <a href="chat.html">Chat</a>
                                </li>
                                <li>
                                    <a href="faq.html">FAQ</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/4.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Admins</span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="admin_list.html">Admin List</a>
                                </li>
                                <li>
                                    <a href="add_new_admin.html">Add New Admin</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/11.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Role &amp; Permissions</span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="module_setting.html">Module Setting</a>
                                </li>
                                <li>
                                    <a href="role_permissions.html">Role &amp; Permissions</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/5.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Users</span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="user_list.html">Users List</a>
                                </li>
                                <li>
                                    <a href="add_new_user.html">Add New User</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a href="invoice.html" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/7.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Invoice</span>
                                </div>
                            </a>
                        </li>
                        <li className="">
                            <a href="Board.html" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/9.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Board</span>
                                </div>
                            </a>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/13.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Products</span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="Products.html">Products</a>
                                </li>
                                <li>
                                    <a href="Product_Details.html">Product Details</a>
                                </li>
                                <li>
                                    <a href="Cart.html">Cart</a>
                                </li>
                                <li>
                                    <a href="Checkout.html">Checkout</a>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="../template_admin/img/menu-icon/14.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Icons</span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="Fontawesome_Icon.html">Fontawesome Icon</a>
                                </li>
                                <li>
                                    <a href="themefy_icon.html">themefy icon</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </body>
        </>
    )
}
export default HeaderAdmin;
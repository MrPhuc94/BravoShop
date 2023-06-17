import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../contants";
import { storeData } from "../utils/storageUtils";
import { useTranslation } from "react-i18next";
import { Images } from "../images";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const quantity = useSelector(state => state.cart.quantity)

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng);
    await storeData(CONSTANTS.LOCALE_PERSISTENCE_KEY, lng);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <img width={50} height={50} src={Images.logo} />
        </Left>
        <Center>
          <Logo>{t('brand')}</Logo>
        </Center>
        <Right>
          <MenuItem>{t('login')}</MenuItem>
          <MenuItem>{t('register')}</MenuItem>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          <MenuItem>
            <Language onClick={(e) => {
              e.preventDefault();
              changeLanguage(
                i18n.language === "vi" ? 'en' : 'vi'
              )
            }}>{i18n.language.toUpperCase()}</Language>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

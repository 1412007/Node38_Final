create database movie;

use movie;
create table HeThongRap (
	ma_he_thong_rap int auto_increment,
    ten_he_thong_rap varchar(255),
    logo varchar(255),
    primary key (ma_he_thong_rap)
);

create table CumRap (
	ma_cum_rap int auto_increment,
    ten_cum_rap varchar(255),
    dia_chi varchar(255),
    ma_he_thong_rap int,
    primary key (ma_cum_rap),
    foreign key (ma_he_thong_rap) references HeThongRap(ma_he_thong_rap)
);

create table RapPhim (
	ma_rap int auto_increment,
    ten_rap varchar(255),
    ma_cum_rap int,
    primary key (ma_rap),
    foreign key (ma_cum_rap) references CumRap(ma_cum_rap)
);

create table Ghe (
	ma_ghe int auto_increment,
    ten_ghe varchar(255),
    loai_ghe varchar(255),
	ma_rap int,
    primary key (ma_ghe),
    foreign key (ma_rap) references RapPhim(ma_rap)
);

create table LoaiNguoiDung (
	ma_loai_nguoi_dung varchar(255),
    ten_loai varchar(255),
    primary key (ma_loai_nguoi_dung)
);

create table NguoiDung (
	tai_khoan int auto_increment,
    ho_ten varchar(255),
    email varchar(255),
    so_dt varchar(255),
    mat_khau varchar(255),
    loai_nguoi_dung varchar(255),
    primary key (tai_khoan),
    foreign key (loai_nguoi_dung) references LoaiNguoiDung(ma_loai_nguoi_dung)
);

create table Phim (
	ma_phim int auto_increment,
    ten_phim varchar(255),
    trailer varchar(255),
    hinh_anh varchar(255),
    mo_ta varchar(255),
    ngay_khoi_chieu date,
    danh_gia int,
    hot boolean,
    dang_chieu boolean,
    sap_chieu boolean,
    primary key (ma_phim)
);

create table LichChieu (
	ma_lich_chieu int auto_increment,
    ma_rap int,
	ma_phim int,
    ngay_gio_chieu datetime,
    gia_ve int,
    primary key (ma_lich_chieu),
    foreign key (ma_rap) references RapPhim(ma_rap),
    foreign key (ma_phim) references Phim(ma_phim)
);

create table DatVe (
	tai_khoan int,
    ma_lich_chieu int,
	ma_ghe int,
    foreign key (ma_lich_chieu) references LichChieu(ma_lich_chieu),
    foreign key (ma_ghe) references Ghe(ma_ghe),
    foreign key (tai_khoan) references NguoiDung(tai_khoan)
);

create table Banner (
    ma_banner int auto_increment,
	ma_phim int,
    hinh_anh varchar(255),
    primary key (ma_banner),
    foreign key (ma_phim) references Phim(ma_phim)
);




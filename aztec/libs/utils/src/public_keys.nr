use dep::aztec::{context::PrivateContext, prelude::AztecAddress};
use std::embedded_curve_ops::EmbeddedCurvePoint;

struct PublicKeys {
    npk_hash: Field,
    ovpk: EmbeddedCurvePoint,
    ivpk: EmbeddedCurvePoint,
}

impl PublicKeys {
    pub fn none() -> PublicKeys {
        PublicKeys {
            npk_hash: 0,
            ovpk: EmbeddedCurvePoint { x: 0, y: 0, is_infinite: false },
            ivpk: EmbeddedCurvePoint { x: 0, y: 0, is_infinite: false }
        }
    }

    pub fn from_private_context(context: &mut PrivateContext, owner: AztecAddress) -> PublicKeys {
        let header = context.get_header();

        PublicKeys {
            npk_hash: header.get_npk_m_hash(context, owner),
            ovpk: header.get_ovpk_m(context, owner),
            ivpk: header.get_ivpk_m(context, owner)
        }
    }
}

// use dep::aztec::protocol_types::traits::{Deserialize, Serialize};

// impl Serialize<5> for PublicKeys {
//         fn serialize(self) -> [Field; 5] {
//             [
//                 self.npk_hash,
//                 self.ovpk.x,
//                 self.ovpk.y,
//                 self.ivpk.x,
//                 self.ivpk.y
//             ]
//         }
//     }

// impl Deserialize<5> for PublicKeys {
//         fn deserialize(fields: [Field; 5]) -> Self {
//             PublicKeys {
//                 npk_hash: fields[0],
//                 ovpk: GrumpkinPoint {
//                     x: fields[1],
//                     y: fields[2]
//                 },
//                 ivpk: GrumpkinPoint {
//                     x: fields[3],
//                     y: fields[4]
//                 },
//             }
//         }
//     }

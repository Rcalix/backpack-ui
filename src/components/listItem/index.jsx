import React from "react";
import radium from "radium";
import truncate from "truncate";
import moment from "moment";
import { Link } from "react-router";
import { color, media } from "rizzo-next/sass/settings.json";
import Bookmark from "../bookmark";
import MoreLink from "../moreLink";
import { gutter, span, percentage } from "../../utils/grid";

const containerWidth = span(8, "static");
const imageWidth = span(2, "static");
const contentWidth = span(6, "static");

const styles = {
  image: {
    base: {
      position: "relative",
      width: percentage("78px", "335px"),

      [`@media (max-width: ${media.max["768"]})`]: {
        float: "right",
        marginTop: ".9rem",
      },

      [`@media (min-width: ${media.min["768"]})`]: {
        position: "absolute",
        right: 0,
        top: 0,
        width: percentage(imageWidth, containerWidth),
      },
    },

    img: {
      display: "block",
      float: "right",
    },
  },

  content: {
    base: {
      position: "relative",
    },
  },

  info: {
    base: {
      overflow: "hidden",
    },
  },

  header: {
    base: {
      overflow: "hidden",

      [`@media (min-width: ${media.min["768"]})`]: {
        marginRight: percentage(gutter("static"), containerWidth),
        width: percentage(contentWidth, containerWidth),
      },
    },
  },

  category: {
    base: {
      color: color.detailHeaderSmall,
      fontSize: "1rem",
      lineHeight: 1,
      marginBottom: ".5rem",
      textTransform: "uppercase",

      [`@media (max-width: ${media.max["768"]})`]: {
        letterSpacing: ".4px",
        marginTop: ".1rem",
      },

      [`@media (min-width: ${media.min["768"]})`]: {
        fontSize: "1.2rem",
        marginBottom: "1rem",
      },
    },

    sponsored: {
      color: color.orange,
    },

    topChoice: {
      color: color.red,
    },

    location: {
      [`@media (max-width: ${media.max["768"]})`]: {
        display: "none",
      },
    },
  },

  title: {
    base: {
      color: color.darkGray,
      float: "left",
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-1px",
      lineHeight: (24 / 20),
      margin: 0,
      maxWidth: "90%",

      [`@media (min-width: ${media.min["768"]})`]: {
        fontSize: "2.8rem",
        lineHeight: (34 / 28),
      },
    },
  },

  bookmark: {
    base: {
      [`@media (max-width: ${media.max["480"]})`]: {
        bottom: "-2.2rem",
        position: "absolute",
        right: 0,
      },

      [`@media (min-width: ${media.min["480"]})`]: {
        display: "inline-block",
        marginLeft: ".5rem",
        marginTop: ".2rem",
      },

      [`@media (min-width: ${media.min["768"]})`]: {
        marginTop: ".8rem",
      },
    },
  },

  description: {
    base: {
      color: color.titleGray,
      float: "left",
      fontSize: "1.4rem",
      lineHeight: (24 / 14),
      marginTop: ".9rem",
      width: percentage("242px", "335px"),

      [`@media (min-width: ${media.min["768"]})`]: {
        fontSize: "1.8rem",
        lineHeight: (32 / 18),
        marginRight: percentage(gutter("static"), containerWidth),
        marginTop: "1.4rem",
        width: percentage(contentWidth, containerWidth),
      },
    },
  },

  link: {
    image: {
      [`@media (max-width: ${media.max["1024"]})`]: {
        display: "none",
      },

      [`@media (min-width: ${media.min["1024"]})`]: {
        marginTop: "2rem",
      },
    },

    description: {
      [`@media (max-width: ${media.max["768"]})`]: {
        marginTop: "1.2rem",
      },

      [`@media (min-width: ${media.min["768"]}) and (max-width: ${media.max["1024"]})`]: {
        marginTop: "1.9rem",
      },

      [`@media (min-width: ${media.min["1024"]})`]: {
        display: "none",
      },
    },
  },
};

function ListItem({
  title,
  slug,
  type,
  subtype,
  place,
  image,
  link,
  description,
  sponsored,
  topChoice,
  bookmark,
  ad,
  date,
}) {
  const shortDescription = truncate(description.replace(/(<([^>]+)>)/ig, ""), 215);

  const imgixString = `?auto=enhance&${image.orientation === "portrait" ?
    "w=110&h=156" :
    "w=170&h=106"}&fit=crop`;

  const showLink = link.title && link.url;

  const ListItemLink = (
    <div className="ListItem-link" style={styles.link.image}>
      <MoreLink href={link.url}>
        {link.title}
      </MoreLink>
    </div>
  );

  return (
    <div className="ListItem">
      <div className="ListItem-content" style={styles.content.base}>
        <header className="ListItem-header" style={styles.header.base}>
          <div className="ListItem-category" style={styles.category.base}>
            {date &&
              <time dateTime={moment(date).format("YYYY-MM-DD")}>
                {moment(date).format("D MMMM YYYY")}
              </time>
            }

            {!date && sponsored && ad &&
              <span style={styles.category.sponsored}>
                Sponsored
                {ad}
              </span>
            } {!date && topChoice &&
              <span style={styles.category.topChoice}>
                Top Choice
              </span>
            } {!date && subtype} {!date && place.name &&
              <span style={styles.category.location}> in {place.name}</span>
            }
          </div>

          <h2 className="ListItem-title" style={styles.title.base}>
            <Link to={`${slug}`} style={{ color: "currentColor" }}>
              {title}
            </Link>
          </h2>

          {bookmark &&
            <div className="ListItem-bookmark" style={styles.bookmark.base}>
              <Bookmark
                onClick={null}
                size="small"
              />
            </div>
          }
        </header>

        {description &&
          <div className="ListItem-info" style={styles.info.base}>
            <div className="ListItem-description" style={styles.description.base}>
              {shortDescription}

              {showLink &&
                <div className="ListItem-link" style={styles.link.description}>
                  <MoreLink href={link.url}>
                    {link.title}
                  </MoreLink>
                </div>
              }
            </div>

            {image.path && showLink &&
              <div className="ListItem-image" style={styles.image.base}>
                <div style={styles.image.img}>
                  <Link to={`${slug}`} style={{ display: "block" }}>
                    <img src={`${image.path}${imgixString}`} alt="" />
                  </Link>

                  {ListItemLink}
                </div>
              </div>
            }

            {image.path && !showLink &&
              <div className="ListItem-image" style={styles.image.base}>
                <a href={`${slug}`} style={styles.image.img}>
                  <img src={`${image.path}${imgixString}`} alt="" />
                </a>
              </div>
            }

            {!image.path && showLink &&
              <div className="ListItem-image" style={styles.image.base}>
                {ListItemLink}
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

ListItem.propTypes = {
  /**
   * The name of the POI
   */
  title: React.PropTypes.string.isRequired,

  /**
   * The URL slug of the POI
   */
  slug: React.PropTypes.string.isRequired,

  /**
   * The type of POI; i.e. Sights
   */
  type: React.PropTypes.string.isRequired,

  /**
   * The subtype of POI; i.e. Museum
   */
  subtype: React.PropTypes.string.isRequired,

  /**
   * The place data for the POI; required keys are name and type
   */
  place: React.PropTypes.object.isRequired,

  /**
   * Image src for the POI; required keys are path and orientation
   */
  image: React.PropTypes.object,

  /**
   * Link to display under image; required keys are title and url
   */
  link: React.PropTypes.object,

  /**
   * Description for POI
   */
  description: React.PropTypes.string,

  /**
   * Add a "sponsored" label
   */
  sponsored: React.PropTypes.bool,

  /**
   * Add a "top choice" label
   */
  topChoice: React.PropTypes.bool,

  /**
   * If list item is able to be bookmarked
   */
  bookmark: React.PropTypes.bool,

  /**
   * Google DFP ad; sponsored must be true
   */
  ad: React.PropTypes.string,

  /**
   * Publish date for news article
   */
  date: React.PropTypes.string,
};

ListItem.defaultProps = {
  title: "",

  slug: "",

  type: "",

  subtype: "",

  place: {},

  image: {},

  link: {},

  description: "",

  sponsored: false,

  topChoice: false,

  bookmark: false,

  ad: "",

  date: "",
};

ListItem.styles = styles;

export default radium(ListItem);

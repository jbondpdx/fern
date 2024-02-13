// This file was auto-generated by Fern from our API Definition.

package api

type GetAllUsersRequest struct {
	XEndpointHeader string   `json:"-" url:"-"`
	Tag             int      `json:"-" url:"tag"`
	Limit           []*int   `json:"-" url:"limit,omitempty"`
	Filter          *string  `json:"-" url:"filter,omitempty"`
	Series          []string `json:"-" url:"series"`
}